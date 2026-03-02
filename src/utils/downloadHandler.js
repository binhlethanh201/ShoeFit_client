export const downloadImageFromServer = async (
  url,
  fileName = "ShoeFit_AI_Result.png",
) => {
  const proxyUrl = "https://api.allorigins.win/raw?url=";
  const targetUrl = proxyUrl + encodeURIComponent(url);

  try {
    const response = await fetch(targetUrl);

    if (!response.ok) throw new Error("Proxy fetch failed");

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
    return true;
  } catch (error) {
    console.error("Vẫn lỗi CORS kể cả qua Proxy, chuyển sang mở tab mới.");
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
    return false;
  }
};
