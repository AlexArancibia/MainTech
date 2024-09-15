import { db } from "@/lib/db";

export const getProgress = async (
  userId: string,
  courseId: string
): Promise<number> => {
  try {
    console.log("[GET_PROGRESS] Iniciando función");
    console.log(`[GET_PROGRESS] userId: ${userId}, courseId: ${courseId}`);

    // Obtener capítulos publicados
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });

    console.log("[GET_PROGRESS] publishedChapters:", publishedChapters);

    const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);
    console.log("[GET_PROGRESS] publishedChapterIds:", publishedChapterIds);

    // Contar los capítulos completados por el usuario
    const validCompletedChapters = await db.userProgress.count({
      where: {
        userId: userId,
        chapterId: {
          in: publishedChapterIds,
        },
        isCompleted: true,
      },
    });

    console.log("[GET_PROGRESS] validCompletedChapters:", validCompletedChapters);

    // Calcular el porcentaje de progreso
    const progressPercentage = (validCompletedChapters / publishedChapterIds.length) * 100;
    console.log("[GET_PROGRESS] progressPercentage:", progressPercentage);

    return progressPercentage;

  } catch (error) {
    console.error("[GET_PROGRESS] Error:", error);
    return 0;
  }
};
