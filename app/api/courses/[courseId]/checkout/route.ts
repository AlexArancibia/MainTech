import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    // Obtener el usuario actual
    const user = await currentUser();
    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Buscar el curso por ID y verificar que esté publicado
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true, // Verificar que el curso esté publicado
      },
    });

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    // Verificar si el usuario ya compró el curso
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: params.courseId,
        },
      },
    });

    if (purchase) {
      return new NextResponse("Course already purchased", { status: 400 });
    }

    // Buscar si ya existe un cliente de Stripe asociado al usuario
    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    // Si no existe, crear un nuevo cliente de Stripe
    if (!stripeCustomer) {
      const newStripeCustomerId = "XDD"; // Generar un UUID único

      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId: user.id,
          stripeCustomerId: newStripeCustomerId, // Usar el nuevo UUID como StripeCustomerId
        },
      });
    }

    // Registrar la compra en la base de datos
    await db.purchase.create({
      data: {
        courseId: params.courseId,
        userId: user.id,
      },
    });

    return new NextResponse("Course purchased successfully", { status: 200 });
  } catch (error) {
    console.error("[COURSE_ID_CHECKOUT]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
