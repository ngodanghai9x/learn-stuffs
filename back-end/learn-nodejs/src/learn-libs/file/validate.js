export const uuidv4Regex = new RegExp('/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/');
export const listImageTypeDot = [".png", ".jpeg", ".webp", ".gif", ".jpg"];
export const listVideoTypeDot = [".mp4", ".3gpp", ".wmv", ".avi", ".mov", '.3gp'];
export const listAudioTypeDot = [".mp3"];
export const listVideoTypeSlash = ["/quicktime", "/mp4", "/3gpp", "/x-msvideo", "/x-ms-wmv", "/avi", "/mov"]; // video/mp4
export const listImageTypeSlash = ["/png", "/jpeg", "/webp", "/gif", "/jpg"]; // image/png

export const FILE_VALID_TYPE = ['png', 'jpeg', 'webp', 'gif', 'jpg', 'mp4', '3gpp', 'wmv', 'avi', 'mov', '3gp', 'pdf'];
export const ACCEPT_ONLY_SUPPORTED_FILE = '.png, .jpeg, .webp, .gif, .jpg, .mp4, .3gpp, .wmv, .avi, .mov, .3gp, .pdf';

export const MIME_TYPE_DICT = {
    'image/jpeg': '.jpeg',
    'image/png': '.png',
    'image/webp': '.webp',
    'image/gif': '.gif',
    'image/jpg': '.jpg',
    'application/pdf': '.pdf',
    'text/html': '.html',
    'application/json': '.json',
}