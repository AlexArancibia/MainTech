import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";

type PurchaseWithCourse = Purchase & {
  course: Course;
};

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
  const grouped: { [courseTitle: string]: number } = {};

  console.log("[groupByCourse] purchases received:", purchases);

  purchases.forEach((purchase) => {
    const courseTitle = purchase.course.title;
    console.log("[groupByCourse] Processing purchase for course:", courseTitle);

    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }

    grouped[courseTitle] += purchase.course.price!;
    console.log(
      `[groupByCourse] Updated total for ${courseTitle}:`,
      grouped[courseTitle]
    );
  });

  console.log("[groupByCourse] Grouped purchases:", grouped);
  return grouped;
};

export const getAnalytics = async (userId: string) => {
  try {
    console.log("[getAnalytics] Fetching purchases for userId:", userId);

    const purchases = await db.purchase.findMany({
      where: {
        course: {
          userId: userId,
        },
      },
      include: {
        course: true,
      },
    });

    console.log("[getAnalytics] Purchases fetched:", purchases);

    const groupedEarnings = groupByCourse(purchases);
    console.log("[getAnalytics] Grouped earnings:", groupedEarnings);

    const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
      name: courseTitle,
      total: total,
    }));

    console.log("[getAnalytics] Data mapped for response:", data);

    const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
    console.log("[getAnalytics] Total revenue calculated:", totalRevenue);

    const totalSales = purchases.length;
    console.log("[getAnalytics] Total sales calculated:", totalSales);

    return {
      data,
      totalRevenue,
      totalSales,
    };
  } catch (error) {
    console.log("[GET_ANALYTICS ERROR]", error);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    };
  }
};
