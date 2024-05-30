/**
 * skyWalking 上报
 */
export const errorReport = (error: any) => {
  window.ClientMonitor?.reportFrameErrors(
    {
      category: 'js',
      grade: 'Warning',
    },
    error,
  );
};
