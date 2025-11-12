/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Error {
    /** Error message */
    error?: string;
}

import type { AxiosInstance, AxiosRequestConfig, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseType;
    /** request body */
    body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
    securityWorker?: (
        securityData: SecurityDataType | null,
    ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
    secure?: boolean;
    format?: ResponseType;
}

export enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded",
    Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
    public instance: AxiosInstance;
    private securityData: SecurityDataType | null = null;
    private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
    private secure?: boolean;
    private format?: ResponseType;

    constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
        this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:3333" });
        this.secure = secure;
        this.format = format;
        this.securityWorker = securityWorker;
    }

    public setSecurityData = (data: SecurityDataType | null) => {
        this.securityData = data;
    };

    protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
        const method = params1.method || (params2 && params2.method);

        return {
            ...this.instance.defaults,
            ...params1,
            ...(params2 || {}),
            headers: {
                ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {}),
            },
        };
    }

    protected stringifyFormItem(formItem: unknown) {
        if (typeof formItem === "object" && formItem !== null) {
            return JSON.stringify(formItem);
        } else {
            return `${formItem}`;
        }
    }

    protected createFormData(input: Record<string, unknown>): FormData {
        if (input instanceof FormData) {
            return input;
        }
        return Object.keys(input || {}).reduce((formData, key) => {
            const property = input[key];
            const propertyContent: any[] = property instanceof Array ? property : [property];

            for (const formItem of propertyContent) {
                const isFileType = formItem instanceof Blob || formItem instanceof File;
                formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
            }

            return formData;
        }, new FormData());
    }

    public request = async <T = any, _E = any>({
        secure,
        path,
        type,
        query,
        format,
        body,
        ...params
    }: FullRequestParams): Promise<T> => {
        const secureParams =
            ((typeof secure === "boolean" ? secure : this.secure) &&
                this.securityWorker &&
                (await this.securityWorker(this.securityData))) ||
            {};
        const requestParams = this.mergeRequestParams(params, secureParams);
        const responseFormat = format || this.format || undefined;

        if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
            body = this.createFormData(body as Record<string, unknown>);
        }

        if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
            body = JSON.stringify(body);
        }

        return this.instance
            .request({
                ...requestParams,
                headers: {
                    ...(requestParams.headers || {}),
                    ...(type ? { "Content-Type": type } : {}),
                },
                params: query,
                responseType: responseFormat,
                data: body,
                url: path,
            })
            .then((response) => response.data);
    };
}

/**
 * @title DocPal Server API
 * @version 1.0.0
 * @baseUrl http://localhost:3333
 *
 * API for document conversion and processing services
 */
export class Template<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    convert = {
        /**
         * No description
         *
         * @tags Document Conversion
         * @name PostConvertHtml
         * @summary Convert TipTap JSON to HTML
         * @request POST:/convert/html
         */
        postConvertHtml: (
            data: {
                json: {
                    /** TipTap document content */
                    content: object;
                    /** Conversion options */
                    options?: object;
                };
                /**
                 * Template variables
                 * @default []
                 */
                variables?: object[];
            },
            params: RequestParams = {},
        ) =>
            this.request<string, any>({
                path: `/convert/html`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document Conversion
         * @name PostConvertDocx
         * @summary Convert TipTap JSON to DOCX
         * @request POST:/convert/docx
         */
        postConvertDocx: (
            data: {
                json: {
                    /** TipTap document content */
                    content: object;
                    /** Conversion options */
                    options?: object;
                };
                /**
                 * Template variables
                 * @default []
                 */
                variables?: object[];
            },
            params: RequestParams = {},
        ) =>
            this.request<File, any>({
                path: `/convert/docx`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document Conversion
         * @name PostConvertPdf
         * @summary Convert TipTap JSON to PDF
         * @request POST:/convert/pdf
         */
        postConvertPdf: (
            data: {
                json: {
                    /** TipTap document content */
                    content: object;
                    options?: {
                        pageSetting?: {
                            /** @example "A4" */
                            defaultPaperSize?: string;
                            defaultMarginConfig?: object;
                        };
                    };
                };
                /**
                 * Template variables
                 * @default []
                 */
                variables?: object[];
            },
            params: RequestParams = {},
        ) =>
            this.request<
                File,
                {
                    error?: string;
                }
            >({
                path: `/convert/pdf`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Document Conversion
         * @name PostConvertHtmlToDocx
         * @summary Convert HTML to DOCX
         * @request POST:/convert/html-to-docx
         */
        postConvertHtmlToDocx: (data: string, params: RequestParams = {}) =>
            this.request<File, any>({
                path: `/convert/html-to-docx`,
                method: "POST",
                body: data,
                type: ContentType.Text,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Data Generation
         * @name PostConvertGeneratedatatodocx
         * @summary Generate DOCX from data and template
         * @request POST:/convert/generateDataToDocx
         */
        postConvertGeneratedatatodocx: (
            data: {
                /** Data to populate template */
                data: object;
                /** Template configuration */
                template: object;
            },
            params: RequestParams = {},
        ) =>
            this.request<
                File,
                {
                    error?: string;
                }
            >({
                path: `/convert/generateDataToDocx`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Data Generation
         * @name PostConvertGeneratedatatohtml
         * @summary Generate HTML from data and template
         * @request POST:/convert/generateDataToHtml
         */
        postConvertGeneratedatatohtml: (
            data: {
                /** Data to populate template */
                data: object;
                /** Template configuration */
                template: object;
            },
            params: RequestParams = {},
        ) =>
            this.request<
                string,
                {
                    error?: string;
                }
            >({
                path: `/convert/generateDataToHtml`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Data Generation
         * @name PostConvertGeneratedatatopdf
         * @summary Generate PDF from data and template
         * @request POST:/convert/generateDataToPdf
         */
        postConvertGeneratedatatopdf: (
            data: {
                /** Data to populate template */
                data: object;
                /** Template configuration */
                template: object;
            },
            params: RequestParams = {},
        ) =>
            this.request<
                File,
                {
                    error?: string;
                }
            >({
                path: `/convert/generateDataToPdf`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * @description Generates a file based on the system_output_file_type parameter. Defaults to DOCX if not specified or invalid.
         *
         * @tags Data Generation
         * @name PostConvertGeneratefilefromdata
         * @summary Generate file (HTML, PDF, or DOCX) from data and template
         * @request POST:/convert/generateFileFromData
         */
        postConvertGeneratefilefromdata: (
            data: {
                /** Data to populate template */
                data: object;
                /** Template configuration */
                template: object;
            },
            params: RequestParams = {},
        ) =>
            this.request<
                string,
                {
                    error?: string;
                }
            >({
                path: `/convert/generateFileFromData`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags File Upload
         * @name PostConvertUploaddocxtohtml
         * @summary Upload DOCX file and convert to HTML
         * @request POST:/convert/uploadDocxToHtml
         */
        postConvertUploaddocxtohtml: (
            data: {
                /**
                 * DOCX file to upload
                 * @format binary
                 */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<
                string,
                | string
                | {
                      error?: string;
                  }
            >({
                path: `/convert/uploadDocxToHtml`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags File Upload
         * @name PostConvertUploaddocxtotemplatejson
         * @summary Upload DOCX file and convert to template JSON
         * @request POST:/convert/uploadDocxToTemplateJson
         */
        postConvertUploaddocxtotemplatejson: (
            data: {
                /**
                 * DOCX file to upload
                 * @format binary
                 */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<
                object,
                | string
                | {
                      error?: string;
                  }
            >({
                path: `/convert/uploadDocxToTemplateJson`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Testing
         * @name PostConvertTest
         * @summary Test endpoint for HTML to JSON conversion
         * @request POST:/convert/test
         */
        postConvertTest: (params: RequestParams = {}) =>
            this.request<object, any>({
                path: `/convert/test`,
                method: "POST",
                format: "json",
                ...params,
            }),
    };
    ws = {
        /**
         * No description
         *
         * @tags WebSocket
         * @name GetWs
         * @summary WebSocket endpoint for document collaboration
         * @request GET:/ws
         */
        getWs: (params: RequestParams = {}) =>
            this.request<any, void>({
                path: `/ws`,
                method: "GET",
                ...params,
            }),
    };
}
