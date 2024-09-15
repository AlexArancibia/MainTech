import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    console.log("[CHAPTER_ID_PROGRESS] params:", params);
    console.log("[CHAPTER_ID_PROGRESS] Iniciando PUT request");
    console.log(`[CHAPTER_ID_PROGRESS] courseId: ${params.courseId}, chapterId: ${params.chapterId}`);

    // Autenticación
    const { userId } = auth();
    console.log("[CHAPTER_ID_PROGRESS] userId:", userId);

    // Verificar si el usuario está autenticado
    if (!userId) {
      console.log("[CHAPTER_ID_PROGRESS] No se encontró userId. No autorizado.");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Obtener el cuerpo de la solicitud
    const { isCompleted } = await req.json();
    console.log("[CHAPTER_ID_PROGRESS] isCompleted:", isCompleted);

    // Upsert en la tabla de progreso del usuario
    const userProgress = await db.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId,
          chapterId: params.chapterId,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        userId,
        chapterId: params.chapterId,
        isCompleted,
      },
    });

    console.log("[CHAPTER_ID_PROGRESS] userProgress actualizado/creado:", userProgress);

    // Responder con el progreso del usuario
    return NextResponse.json(userProgress);

  } catch (error) {
    console.error("[CHAPTER_ID_PROGRESS] Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
