declare module "*/conf-common.json" {
    export const application_name: string;
    export const application_version: string;
    export const build_date: string;
}

declare module "*/api-nabaztag.json" {
    export const secureKey: string;

    export const openjabnabCodeIsSleepting: number;
    export const openjabnabCodeWakeup: number;
    export const openjabnabCodeSleep: number;
    export const openjabnabUrl: string;
    export const openjabnabToken: string;

    export const nabaztagMac: string;
} 

