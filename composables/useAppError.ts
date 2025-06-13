interface AppError {
  value?: {
    statusCode?: number;
    statusMessage?: string;
  };
}

export default function (error: AppError | null | undefined): never | void {
  if (!error) return;

  if (process.server) {
    throw createError({
      statusCode: error.value?.statusCode || 500,
      statusMessage: error.value?.statusMessage || 'Ошибка сервера',
    });
  } else {
    window.location.reload();
    throw createError({
      statusCode: error.value?.statusCode || 500,
      statusMessage: error.value?.statusMessage || 'Ошибка сервера',
    });
  }
}
