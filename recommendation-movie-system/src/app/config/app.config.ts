export class AppConfig {
    private pathDomain: string;
    private versionApi: string;

    constructor() {
        this.pathDomain = 'http://localhost:3000';
        // this.versionApi = 'v1';
    }

    public setPathDomain(pathDomain: string) {
        this.pathDomain = pathDomain;
    }

    public getPathDomain(): string {
        return this.pathDomain;
    }

    public getDomainUrl(): string {
        // return `${this.pathDomain}/api/${this.versionApi}/`;
        return `${this.pathDomain}/api/`
    }

    public getVersionApi() {
        return this.versionApi;
    }
}