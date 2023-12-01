import { ChooserOptions } from "@awesome-cordova-plugins/chooser/ngx";
import { AwesomeCordovaNativePlugin } from "@awesome-cordova-plugins/core";

export interface ChooserResult {
    path: string;
    /**
     * without extension
     */
    name: string;
    /**
     * with extension
     */
    displayName: string;
    mimeType: string;
    extension: string;
    size: number;
}

export declare class Chooser extends AwesomeCordovaNativePlugin {
    /**
     * Displays native prompt for user to select a file.
     *
     * @param {Object} options
     * @param {string} options.mimeTypes Optional MIME type filter (e.g. 'image/gif,video/*').
     * @param {string} options.maxFileSize Optional Max file size.
     * @returns {Promise<any>} Promise containing selected file's
     * data: MIME type, display name, and original URI.
     */
    getFile(options?: ChooserOptions): Promise<ChooserResultCordova | undefined>;
}
export interface ChooserResultCordova extends ChooserResult {
    dataURI: string
}
