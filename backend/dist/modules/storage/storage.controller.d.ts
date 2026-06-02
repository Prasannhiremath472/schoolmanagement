import { StorageService } from './storage.service';
export declare class StorageController {
    private readonly storageService;
    constructor(storageService: StorageService);
    upload(file: Express.Multer.File, folder?: string): Promise<{
        data: {
            url: string;
            key: string;
            size: number;
        };
        message: string;
    }>;
}
