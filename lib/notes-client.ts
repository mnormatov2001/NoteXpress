//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.20.0.0 (NJsonSchema v10.9.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

import { NotesClientBase } from "./notes-client-base";

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

export class NotesClient extends NotesClientBase {
  private http: {
    fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
  };
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    baseUrl?: string,
    http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
  ) {
    super();
    this.http = http ? http : (window as any);
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
  }

  /**
   * Gets the note by id
   * @param id Note id (guid)
   */
  getNote(id: string): Promise<Note> {
    let url_ = this.baseUrl + "/notes/{id}";
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace("{id}", encodeURIComponent("" + id));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "Application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.processGetNote(_response);
      });
  }

  protected processGetNote(response: Response): Promise<Note> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 401) {
      return response.text().then((_responseText) => {
        let result401: any = null;
        result401 =
          _responseText === ""
            ? null
            : (JSON.parse(
                _responseText,
                this.jsonParseReviver
              ) as ProblemDetails);
        return throwException(
          "The user is unauthorized",
          status,
          _responseText,
          _headers,
          result401
        );
      });
    } else if (status === 404) {
      return response.text().then((_responseText) => {
        let result404: any = null;
        result404 =
          _responseText === ""
            ? null
            : (JSON.parse(
                _responseText,
                this.jsonParseReviver
              ) as ProblemDetails);
        return throwException(
          "The requested note is not found",
          status,
          _responseText,
          _headers,
          result404
        );
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        result400 =
          _responseText === ""
            ? null
            : (JSON.parse(
                _responseText,
                this.jsonParseReviver
              ) as ProblemDetails);
        return throwException(
          "The request is not validated",
          status,
          _responseText,
          _headers,
          result400
        );
      });
    } else if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        result200 =
          _responseText === ""
            ? null
            : (JSON.parse(_responseText, this.jsonParseReviver) as Note);
        return result200;
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<Note>(null as any);
  }

  /**
   * Deletes the note by id
   * @param id Note id (guid)
   */
  deleteNote(id: string): Promise<string> {
    let url_ = this.baseUrl + "/notes/{id}";
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace("{id}", encodeURIComponent("" + id));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "DELETE",
      headers: {
        Accept: "Application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.processDeleteNote(_response);
      });
  }

  protected processDeleteNote(response: Response): Promise<string> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 401) {
      return response.text().then((_responseText) => {
        let result401: any = null;
        result401 =
          _responseText === ""
            ? null
            : (JSON.parse(
                _responseText,
                this.jsonParseReviver
              ) as ProblemDetails);
        return throwException(
          "The user is unauthorized",
          status,
          _responseText,
          _headers,
          result401
        );
      });
    } else if (status === 404) {
      return response.text().then((_responseText) => {
        let result404: any = null;
        result404 =
          _responseText === ""
            ? null
            : (JSON.parse(
                _responseText,
                this.jsonParseReviver
              ) as ProblemDetails);
        return throwException(
          "The requested note is not found",
          status,
          _responseText,
          _headers,
          result404
        );
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        result400 =
          _responseText === ""
            ? null
            : (JSON.parse(
                _responseText,
                this.jsonParseReviver
              ) as ProblemDetails);
        return throwException(
          "The request is not validated",
          status,
          _responseText,
          _headers,
          result400
        );
      });
    } else if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        result200 =
          _responseText === ""
            ? null
            : (JSON.parse(_responseText, this.jsonParseReviver) as string);
        return result200;
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<string>(null as any);
  }

  /**
   * Updates the note
   * @param body (optional)
   */
  updateNote(body: UpdateNoteDto | undefined): Promise<string> {
    let url_ = this.baseUrl + "/notes/update";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: RequestInit = {
      body: content_,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "Application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.processUpdateNote(_response);
      });
  }

  protected processUpdateNote(response: Response): Promise<string> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 401) {
      return response.text().then((_responseText) => {
        let result401: any = null;
        result401 =
          _responseText === ""
            ? null
            : (JSON.parse(
                _responseText,
                this.jsonParseReviver
              ) as ProblemDetails);
        return throwException(
          "The user is unauthorized",
          status,
          _responseText,
          _headers,
          result401
        );
      });
    } else if (status === 404) {
      return response.text().then((_responseText) => {
        let result404: any = null;
        result404 =
          _responseText === ""
            ? null
            : (JSON.parse(
                _responseText,
                this.jsonParseReviver
              ) as ProblemDetails);
        return throwException(
          "The requested note is not found",
          status,
          _responseText,
          _headers,
          result404
        );
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        result400 =
          _responseText === ""
            ? null
            : (JSON.parse(
                _responseText,
                this.jsonParseReviver
              ) as ProblemDetails);
        return throwException(
          "The request is not validated",
          status,
          _responseText,
          _headers,
          result400
        );
      });
    } else if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        result200 =
          _responseText === ""
            ? null
            : (JSON.parse(_responseText, this.jsonParseReviver) as string);
        return result200;
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<string>(null as any);
  }

  /**
   * Creates the note
   * @param body (optional) CreateNoteDto
   */
  createNote(body: CreateNoteDto | undefined): Promise<string> {
    let url_ = this.baseUrl + "/notes/create";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "Application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.processCreateNote(_response);
      });
  }

  protected processCreateNote(response: Response): Promise<string> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 401) {
      return response.text().then((_responseText) => {
        let result401: any = null;
        result401 =
          _responseText === ""
            ? null
            : (JSON.parse(
                _responseText,
                this.jsonParseReviver
              ) as ProblemDetails);
        return throwException(
          "The user is unauthorized",
          status,
          _responseText,
          _headers,
          result401
        );
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        result400 =
          _responseText === ""
            ? null
            : (JSON.parse(
                _responseText,
                this.jsonParseReviver
              ) as ProblemDetails);
        return throwException(
          "The request is not validated",
          status,
          _responseText,
          _headers,
          result400
        );
      });
    } else if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        result200 =
          _responseText === ""
            ? null
            : (JSON.parse(_responseText, this.jsonParseReviver) as string);
        return result200;
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<string>(null as any);
  }

  /**
   * Gets the number of child elements of a note
   * @param parentNoteId (optional) Id of parent note (guid)
   */
  childrenCount(parentNoteId: string | undefined): Promise<number> {
    let url_ = this.baseUrl + "/notes/children/count?";
    if (parentNoteId === null)
      throw new Error("The parameter 'parentNoteId' cannot be null.");
    else if (parentNoteId !== undefined)
      url_ += "parentNoteId=" + encodeURIComponent("" + parentNoteId) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "Application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.processChildrenCount(_response);
      });
  }

  protected processChildrenCount(response: Response): Promise<number> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 401) {
      return response.text().then((_responseText) => {
        let result401: any = null;
        result401 =
          _responseText === ""
            ? null
            : (JSON.parse(
                _responseText,
                this.jsonParseReviver
              ) as ProblemDetails);
        return throwException(
          "The user is unauthorized",
          status,
          _responseText,
          _headers,
          result401
        );
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        result400 =
          _responseText === ""
            ? null
            : (JSON.parse(
                _responseText,
                this.jsonParseReviver
              ) as ProblemDetails);
        return throwException(
          "The request is not validated",
          status,
          _responseText,
          _headers,
          result400
        );
      });
    } else if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        result200 =
          _responseText === ""
            ? null
            : (JSON.parse(_responseText, this.jsonParseReviver) as number);
        return result200;
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<number>(null as any);
  }

  /**
   * Gets all child elements of a note
   * @param parentNoteId (optional) Id of parent note (guid)
   */
  getChildren(parentNoteId: string | undefined): Promise<Note[]> {
    let url_ = this.baseUrl + "/notes/children?";
    if (parentNoteId === null)
      throw new Error("The parameter 'parentNoteId' cannot be null.");
    else if (parentNoteId !== undefined)
      url_ += "parentNoteId=" + encodeURIComponent("" + parentNoteId) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "Application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.processGetChildren(_response);
      });
  }

  protected processGetChildren(response: Response): Promise<Note[]> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 401) {
      return response.text().then((_responseText) => {
        let result401: any = null;
        result401 =
          _responseText === ""
            ? null
            : (JSON.parse(
                _responseText,
                this.jsonParseReviver
              ) as ProblemDetails);
        return throwException(
          "The user is unauthorized",
          status,
          _responseText,
          _headers,
          result401
        );
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        result400 =
          _responseText === ""
            ? null
            : (JSON.parse(
                _responseText,
                this.jsonParseReviver
              ) as ProblemDetails);
        return throwException(
          "The request is not validated",
          status,
          _responseText,
          _headers,
          result400
        );
      });
    } else if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        result200 =
          _responseText === ""
            ? null
            : (JSON.parse(_responseText, this.jsonParseReviver) as Note[]);
        return result200;
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<Note[]>(null as any);
  }

  /**
   * Gets all notes
   */
  getAllNotes(): Promise<Note[]> {
    let url_ = this.baseUrl + "/notes/all";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "Application/json",
      },
    };

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        return this.processGetAllNotes(_response);
      });
  }

  protected processGetAllNotes(response: Response): Promise<Note[]> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 401) {
      return response.text().then((_responseText) => {
        let result401: any = null;
        result401 =
          _responseText === ""
            ? null
            : (JSON.parse(
                _responseText,
                this.jsonParseReviver
              ) as ProblemDetails);
        return throwException(
          "The user is unauthorized",
          status,
          _responseText,
          _headers,
          result401
        );
      });
    } else if (status === 400) {
      return response.text().then((_responseText) => {
        let result400: any = null;
        result400 =
          _responseText === ""
            ? null
            : (JSON.parse(
                _responseText,
                this.jsonParseReviver
              ) as ProblemDetails);
        return throwException(
          "The request is not validated",
          status,
          _responseText,
          _headers,
          result400
        );
      });
    } else if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        result200 =
          _responseText === ""
            ? null
            : (JSON.parse(_responseText, this.jsonParseReviver) as Note[]);
        return result200;
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<Note[]>(null as any);
  }
}

export interface CreateNoteDto {
  title: string;
  content?: string;
  parentNoteId?: string;
  icon?: string;
  coverImage?: string;
  isArchived?: boolean;
  isPublished?: boolean;
}

export interface Note {
  id: string;
  parentNoteId?: string;
  title: string;
  content?: string;
  creationDate?: Date;
  editDate?: Date;
  icon?: string;
  coverImage?: string;
  isArchived?: boolean;
  isPublished?: boolean;
}

export interface ProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;

  [key: string]: any;
}

export interface UpdateNoteDto {
  id: string;
  title: string;
  content?: string;
  parentNoteId?: string;
  icon?: string;
  coverImage?: string;
  isArchived?: boolean;
  isPublished?: boolean;
}

export class NotesApiException extends Error {
  message: string;
  status: number;
  response: string;
  headers: { [key: string]: any };
  result: any;

  constructor(
    message: string,
    status: number,
    response: string,
    headers: { [key: string]: any },
    result: any
  ) {
    super();

    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }

  protected isNotesApiException = true;

  static isNotesApiException(obj: any): obj is NotesApiException {
    return obj.isNotesApiException === true;
  }
}

function throwException(
  message: string,
  status: number,
  response: string,
  headers: { [key: string]: any },
  result?: any
): any {
  throw new NotesApiException(message, status, response, headers, result);
}
