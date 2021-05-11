// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **

/* global window */
import * as gax from 'google-gax';
import {Callback, CallOptions, Descriptors, ClientOptions} from 'google-gax';
import * as path from 'path';

import * as protos from '../../protos/protos';
import jsonProtos = require('../../protos/protos.json');
/**
 * Client JSON configuration object, loaded from
 * `src/v1p2beta1/asset_service_client_config.json`.
 * This file defines retry strategy and timeouts for all API methods in this library.
 */
import * as gapicConfig from './asset_service_client_config.json';

const version = require('../../../package.json').version;

/**
 *  Asset service definition.
 * @class
 * @memberof v1p2beta1
 */
export class AssetServiceClient {
  private _terminated = false;
  private _opts: ClientOptions;
  private _gaxModule: typeof gax | typeof gax.fallback;
  private _gaxGrpc: gax.GrpcClient | gax.fallback.GrpcClient;
  private _protos: {};
  private _defaults: {[method: string]: gax.CallSettings};
  auth: gax.GoogleAuth;
  descriptors: Descriptors = {
    page: {},
    stream: {},
    longrunning: {},
    batching: {},
  };
  innerApiCalls: {[name: string]: Function};
  pathTemplates: {[name: string]: gax.PathTemplate};
  assetServiceStub?: Promise<{[name: string]: Function}>;

  /**
   * Construct an instance of AssetServiceClient.
   *
   * @param {object} [options] - The configuration object.
   * The options accepted by the constructor are described in detail
   * in [this document](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#creating-the-client-instance).
   * The common options are:
   * @param {object} [options.credentials] - Credentials object.
   * @param {string} [options.credentials.client_email]
   * @param {string} [options.credentials.private_key]
   * @param {string} [options.email] - Account email address. Required when
   *     using a .pem or .p12 keyFilename.
   * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
   *     .p12 key downloaded from the Google Developers Console. If you provide
   *     a path to a JSON file, the projectId option below is not necessary.
   *     NOTE: .pem and .p12 require you to specify options.email as well.
   * @param {number} [options.port] - The port on which to connect to
   *     the remote host.
   * @param {string} [options.projectId] - The project ID from the Google
   *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
   *     the environment variable GCLOUD_PROJECT for your project ID. If your
   *     app is running in an environment which supports
   *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
   *     your project ID will be detected automatically.
   * @param {string} [options.apiEndpoint] - The domain name of the
   *     API remote host.
   * @param {gax.ClientConfig} [options.clientConfig] - Client configuration override.
   *     Follows the structure of {@link gapicConfig}.
   * @param {boolean} [options.fallback] - Use HTTP fallback mode.
   *     In fallback mode, a special browser-compatible transport implementation is used
   *     instead of gRPC transport. In browser context (if the `window` object is defined)
   *     the fallback mode is enabled automatically; set `options.fallback` to `false`
   *     if you need to override this behavior.
   */
  constructor(opts?: ClientOptions) {
    // Ensure that options include all the required fields.
    const staticMembers = this.constructor as typeof AssetServiceClient;
    const servicePath =
      opts?.servicePath || opts?.apiEndpoint || staticMembers.servicePath;
    const port = opts?.port || staticMembers.port;
    const clientConfig = opts?.clientConfig ?? {};
    const fallback =
      opts?.fallback ??
      (typeof window !== 'undefined' && typeof window?.fetch === 'function');
    opts = Object.assign({servicePath, port, clientConfig, fallback}, opts);

    // If scopes are unset in options and we're connecting to a non-default endpoint, set scopes just in case.
    if (servicePath !== staticMembers.servicePath && !('scopes' in opts)) {
      opts['scopes'] = staticMembers.scopes;
    }

    // Choose either gRPC or proto-over-HTTP implementation of google-gax.
    this._gaxModule = opts.fallback ? gax.fallback : gax;

    // Create a `gaxGrpc` object, with any grpc-specific options sent to the client.
    this._gaxGrpc = new this._gaxModule.GrpcClient(opts);

    // Save options to use in initialize() method.
    this._opts = opts;

    // Save the auth object to the client, for use by other methods.
    this.auth = this._gaxGrpc.auth as gax.GoogleAuth;

    // Set the default scopes in auth client if needed.
    if (servicePath === staticMembers.servicePath) {
      this.auth.defaultScopes = staticMembers.scopes;
    }

    // Determine the client header string.
    const clientHeader = [`gax/${this._gaxModule.version}`, `gapic/${version}`];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${this._gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${this._gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    this._protos = this._gaxGrpc.loadProtoJSON(jsonProtos);

    // This API contains "path templates"; forward-slash-separated
    // identifiers to uniquely identify resources within the API.
    // Create useful helper objects for these.
    this.pathTemplates = {
      folderFeedPathTemplate: new this._gaxModule.PathTemplate(
        'folders/{folder}/feeds/{feed}'
      ),
      organizationFeedPathTemplate: new this._gaxModule.PathTemplate(
        'organizations/{organization}/feeds/{feed}'
      ),
      projectFeedPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/feeds/{feed}'
      ),
    };

    // Put together the default options sent with requests.
    this._defaults = this._gaxGrpc.constructSettings(
      'google.cloud.asset.v1p2beta1.AssetService',
      gapicConfig as gax.ClientConfig,
      opts.clientConfig || {},
      {'x-goog-api-client': clientHeader.join(' ')}
    );

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this.innerApiCalls = {};
  }

  /**
   * Initialize the client.
   * Performs asynchronous operations (such as authentication) and prepares the client.
   * This function will be called automatically when any class method is called for the
   * first time, but if you need to initialize it before calling an actual method,
   * feel free to call initialize() directly.
   *
   * You can await on this method if you want to make sure the client is initialized.
   *
   * @returns {Promise} A promise that resolves to an authenticated service stub.
   */
  initialize() {
    // If the client stub promise is already initialized, return immediately.
    if (this.assetServiceStub) {
      return this.assetServiceStub;
    }

    // Put together the "service stub" for
    // google.cloud.asset.v1p2beta1.AssetService.
    this.assetServiceStub = this._gaxGrpc.createStub(
      this._opts.fallback
        ? (this._protos as protobuf.Root).lookupService(
            'google.cloud.asset.v1p2beta1.AssetService'
          )
        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (this._protos as any).google.cloud.asset.v1p2beta1.AssetService,
      this._opts
    ) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const assetServiceStubMethods = [
      'createFeed',
      'getFeed',
      'listFeeds',
      'updateFeed',
      'deleteFeed',
    ];
    for (const methodName of assetServiceStubMethods) {
      const callPromise = this.assetServiceStub.then(
        stub =>
          (...args: Array<{}>) => {
            if (this._terminated) {
              return Promise.reject('The client has already been closed.');
            }
            const func = stub[methodName];
            return func.apply(stub, args);
          },
        (err: Error | null | undefined) => () => {
          throw err;
        }
      );

      const descriptor = undefined;
      const apiCall = this._gaxModule.createApiCall(
        callPromise,
        this._defaults[methodName],
        descriptor
      );

      this.innerApiCalls[methodName] = apiCall;
    }

    return this.assetServiceStub;
  }

  /**
   * The DNS address for this API service.
   * @returns {string} The DNS address for this service.
   */
  static get servicePath() {
    return 'cloudasset.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath(),
   * exists for compatibility reasons.
   * @returns {string} The DNS address for this service.
   */
  static get apiEndpoint() {
    return 'cloudasset.googleapis.com';
  }

  /**
   * The port for this API service.
   * @returns {number} The default port for this service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   * @returns {string[]} List of default scopes.
   */
  static get scopes() {
    return ['https://www.googleapis.com/auth/cloud-platform'];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @returns {Promise} A promise that resolves to string containing the project ID.
   */
  getProjectId(
    callback?: Callback<string, undefined, undefined>
  ): Promise<string> | void {
    if (callback) {
      this.auth.getProjectId(callback);
      return;
    }
    return this.auth.getProjectId();
  }

  // -------------------
  // -- Service calls --
  // -------------------
  createFeed(
    request: protos.google.cloud.asset.v1p2beta1.ICreateFeedRequest,
    options?: CallOptions
  ): Promise<
    [
      protos.google.cloud.asset.v1p2beta1.IFeed,
      protos.google.cloud.asset.v1p2beta1.ICreateFeedRequest | undefined,
      {} | undefined
    ]
  >;
  createFeed(
    request: protos.google.cloud.asset.v1p2beta1.ICreateFeedRequest,
    options: CallOptions,
    callback: Callback<
      protos.google.cloud.asset.v1p2beta1.IFeed,
      protos.google.cloud.asset.v1p2beta1.ICreateFeedRequest | null | undefined,
      {} | null | undefined
    >
  ): void;
  createFeed(
    request: protos.google.cloud.asset.v1p2beta1.ICreateFeedRequest,
    callback: Callback<
      protos.google.cloud.asset.v1p2beta1.IFeed,
      protos.google.cloud.asset.v1p2beta1.ICreateFeedRequest | null | undefined,
      {} | null | undefined
    >
  ): void;
  /**
   * Creates a feed in a parent project/folder/organization to listen to its
   * asset updates.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. The name of the project/folder/organization where this feed
   *   should be created in. It can only be an organization number (such as
   *   "organizations/123"), a folder number (such as "folders/123"), a project ID
   *   (such as "projects/my-project-id")", or a project number (such as
   *   "projects/12345").
   * @param {string} request.feedId
   *   Required. This is the client-assigned asset feed identifier and it needs to
   *   be unique under a specific parent project/folder/organization.
   * @param {google.cloud.asset.v1p2beta1.Feed} request.feed
   *   Required. The feed details. The field `name` must be empty and it will be generated
   *   in the format of:
   *   projects/project_number/feeds/feed_id
   *   folders/folder_number/feeds/feed_id
   *   organizations/organization_number/feeds/feed_id
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Feed]{@link google.cloud.asset.v1p2beta1.Feed}.
   *   Please see the
   *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
   *   for more details and examples.
   * @example
   * const [response] = await client.createFeed(request);
   */
  createFeed(
    request: protos.google.cloud.asset.v1p2beta1.ICreateFeedRequest,
    optionsOrCallback?:
      | CallOptions
      | Callback<
          protos.google.cloud.asset.v1p2beta1.IFeed,
          | protos.google.cloud.asset.v1p2beta1.ICreateFeedRequest
          | null
          | undefined,
          {} | null | undefined
        >,
    callback?: Callback<
      protos.google.cloud.asset.v1p2beta1.IFeed,
      protos.google.cloud.asset.v1p2beta1.ICreateFeedRequest | null | undefined,
      {} | null | undefined
    >
  ): Promise<
    [
      protos.google.cloud.asset.v1p2beta1.IFeed,
      protos.google.cloud.asset.v1p2beta1.ICreateFeedRequest | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers['x-goog-request-params'] =
      gax.routingHeader.fromParams({
        parent: request.parent || '',
      });
    this.initialize();
    return this.innerApiCalls.createFeed(request, options, callback);
  }
  getFeed(
    request: protos.google.cloud.asset.v1p2beta1.IGetFeedRequest,
    options?: CallOptions
  ): Promise<
    [
      protos.google.cloud.asset.v1p2beta1.IFeed,
      protos.google.cloud.asset.v1p2beta1.IGetFeedRequest | undefined,
      {} | undefined
    ]
  >;
  getFeed(
    request: protos.google.cloud.asset.v1p2beta1.IGetFeedRequest,
    options: CallOptions,
    callback: Callback<
      protos.google.cloud.asset.v1p2beta1.IFeed,
      protos.google.cloud.asset.v1p2beta1.IGetFeedRequest | null | undefined,
      {} | null | undefined
    >
  ): void;
  getFeed(
    request: protos.google.cloud.asset.v1p2beta1.IGetFeedRequest,
    callback: Callback<
      protos.google.cloud.asset.v1p2beta1.IFeed,
      protos.google.cloud.asset.v1p2beta1.IGetFeedRequest | null | undefined,
      {} | null | undefined
    >
  ): void;
  /**
   * Gets details about an asset feed.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   Required. The name of the Feed and it must be in the format of:
   *   projects/project_number/feeds/feed_id
   *   folders/folder_number/feeds/feed_id
   *   organizations/organization_number/feeds/feed_id
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Feed]{@link google.cloud.asset.v1p2beta1.Feed}.
   *   Please see the
   *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
   *   for more details and examples.
   * @example
   * const [response] = await client.getFeed(request);
   */
  getFeed(
    request: protos.google.cloud.asset.v1p2beta1.IGetFeedRequest,
    optionsOrCallback?:
      | CallOptions
      | Callback<
          protos.google.cloud.asset.v1p2beta1.IFeed,
          | protos.google.cloud.asset.v1p2beta1.IGetFeedRequest
          | null
          | undefined,
          {} | null | undefined
        >,
    callback?: Callback<
      protos.google.cloud.asset.v1p2beta1.IFeed,
      protos.google.cloud.asset.v1p2beta1.IGetFeedRequest | null | undefined,
      {} | null | undefined
    >
  ): Promise<
    [
      protos.google.cloud.asset.v1p2beta1.IFeed,
      protos.google.cloud.asset.v1p2beta1.IGetFeedRequest | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers['x-goog-request-params'] =
      gax.routingHeader.fromParams({
        name: request.name || '',
      });
    this.initialize();
    return this.innerApiCalls.getFeed(request, options, callback);
  }
  listFeeds(
    request: protos.google.cloud.asset.v1p2beta1.IListFeedsRequest,
    options?: CallOptions
  ): Promise<
    [
      protos.google.cloud.asset.v1p2beta1.IListFeedsResponse,
      protos.google.cloud.asset.v1p2beta1.IListFeedsRequest | undefined,
      {} | undefined
    ]
  >;
  listFeeds(
    request: protos.google.cloud.asset.v1p2beta1.IListFeedsRequest,
    options: CallOptions,
    callback: Callback<
      protos.google.cloud.asset.v1p2beta1.IListFeedsResponse,
      protos.google.cloud.asset.v1p2beta1.IListFeedsRequest | null | undefined,
      {} | null | undefined
    >
  ): void;
  listFeeds(
    request: protos.google.cloud.asset.v1p2beta1.IListFeedsRequest,
    callback: Callback<
      protos.google.cloud.asset.v1p2beta1.IListFeedsResponse,
      protos.google.cloud.asset.v1p2beta1.IListFeedsRequest | null | undefined,
      {} | null | undefined
    >
  ): void;
  /**
   * Lists all asset feeds in a parent project/folder/organization.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. The parent project/folder/organization whose feeds are to be
   *   listed. It can only be using project/folder/organization number (such as
   *   "folders/12345")", or a project ID (such as "projects/my-project-id").
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [ListFeedsResponse]{@link google.cloud.asset.v1p2beta1.ListFeedsResponse}.
   *   Please see the
   *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
   *   for more details and examples.
   * @example
   * const [response] = await client.listFeeds(request);
   */
  listFeeds(
    request: protos.google.cloud.asset.v1p2beta1.IListFeedsRequest,
    optionsOrCallback?:
      | CallOptions
      | Callback<
          protos.google.cloud.asset.v1p2beta1.IListFeedsResponse,
          | protos.google.cloud.asset.v1p2beta1.IListFeedsRequest
          | null
          | undefined,
          {} | null | undefined
        >,
    callback?: Callback<
      protos.google.cloud.asset.v1p2beta1.IListFeedsResponse,
      protos.google.cloud.asset.v1p2beta1.IListFeedsRequest | null | undefined,
      {} | null | undefined
    >
  ): Promise<
    [
      protos.google.cloud.asset.v1p2beta1.IListFeedsResponse,
      protos.google.cloud.asset.v1p2beta1.IListFeedsRequest | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers['x-goog-request-params'] =
      gax.routingHeader.fromParams({
        parent: request.parent || '',
      });
    this.initialize();
    return this.innerApiCalls.listFeeds(request, options, callback);
  }
  updateFeed(
    request: protos.google.cloud.asset.v1p2beta1.IUpdateFeedRequest,
    options?: CallOptions
  ): Promise<
    [
      protos.google.cloud.asset.v1p2beta1.IFeed,
      protos.google.cloud.asset.v1p2beta1.IUpdateFeedRequest | undefined,
      {} | undefined
    ]
  >;
  updateFeed(
    request: protos.google.cloud.asset.v1p2beta1.IUpdateFeedRequest,
    options: CallOptions,
    callback: Callback<
      protos.google.cloud.asset.v1p2beta1.IFeed,
      protos.google.cloud.asset.v1p2beta1.IUpdateFeedRequest | null | undefined,
      {} | null | undefined
    >
  ): void;
  updateFeed(
    request: protos.google.cloud.asset.v1p2beta1.IUpdateFeedRequest,
    callback: Callback<
      protos.google.cloud.asset.v1p2beta1.IFeed,
      protos.google.cloud.asset.v1p2beta1.IUpdateFeedRequest | null | undefined,
      {} | null | undefined
    >
  ): void;
  /**
   * Updates an asset feed configuration.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {google.cloud.asset.v1p2beta1.Feed} request.feed
   *   Required. The new values of feed details. It must match an existing feed and the
   *   field `name` must be in the format of:
   *   projects/project_number/feeds/feed_id or
   *   folders/folder_number/feeds/feed_id or
   *   organizations/organization_number/feeds/feed_id.
   * @param {google.protobuf.FieldMask} request.updateMask
   *   Required. Only updates the `feed` fields indicated by this mask.
   *   The field mask must not be empty, and it must not contain fields that
   *   are immutable or only set by the server.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Feed]{@link google.cloud.asset.v1p2beta1.Feed}.
   *   Please see the
   *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
   *   for more details and examples.
   * @example
   * const [response] = await client.updateFeed(request);
   */
  updateFeed(
    request: protos.google.cloud.asset.v1p2beta1.IUpdateFeedRequest,
    optionsOrCallback?:
      | CallOptions
      | Callback<
          protos.google.cloud.asset.v1p2beta1.IFeed,
          | protos.google.cloud.asset.v1p2beta1.IUpdateFeedRequest
          | null
          | undefined,
          {} | null | undefined
        >,
    callback?: Callback<
      protos.google.cloud.asset.v1p2beta1.IFeed,
      protos.google.cloud.asset.v1p2beta1.IUpdateFeedRequest | null | undefined,
      {} | null | undefined
    >
  ): Promise<
    [
      protos.google.cloud.asset.v1p2beta1.IFeed,
      protos.google.cloud.asset.v1p2beta1.IUpdateFeedRequest | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers['x-goog-request-params'] =
      gax.routingHeader.fromParams({
        'feed.name': request.feed!.name || '',
      });
    this.initialize();
    return this.innerApiCalls.updateFeed(request, options, callback);
  }
  deleteFeed(
    request: protos.google.cloud.asset.v1p2beta1.IDeleteFeedRequest,
    options?: CallOptions
  ): Promise<
    [
      protos.google.protobuf.IEmpty,
      protos.google.cloud.asset.v1p2beta1.IDeleteFeedRequest | undefined,
      {} | undefined
    ]
  >;
  deleteFeed(
    request: protos.google.cloud.asset.v1p2beta1.IDeleteFeedRequest,
    options: CallOptions,
    callback: Callback<
      protos.google.protobuf.IEmpty,
      protos.google.cloud.asset.v1p2beta1.IDeleteFeedRequest | null | undefined,
      {} | null | undefined
    >
  ): void;
  deleteFeed(
    request: protos.google.cloud.asset.v1p2beta1.IDeleteFeedRequest,
    callback: Callback<
      protos.google.protobuf.IEmpty,
      protos.google.cloud.asset.v1p2beta1.IDeleteFeedRequest | null | undefined,
      {} | null | undefined
    >
  ): void;
  /**
   * Deletes an asset feed.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   Required. The name of the feed and it must be in the format of:
   *   projects/project_number/feeds/feed_id
   *   folders/folder_number/feeds/feed_id
   *   organizations/organization_number/feeds/feed_id
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Empty]{@link google.protobuf.Empty}.
   *   Please see the
   *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
   *   for more details and examples.
   * @example
   * const [response] = await client.deleteFeed(request);
   */
  deleteFeed(
    request: protos.google.cloud.asset.v1p2beta1.IDeleteFeedRequest,
    optionsOrCallback?:
      | CallOptions
      | Callback<
          protos.google.protobuf.IEmpty,
          | protos.google.cloud.asset.v1p2beta1.IDeleteFeedRequest
          | null
          | undefined,
          {} | null | undefined
        >,
    callback?: Callback<
      protos.google.protobuf.IEmpty,
      protos.google.cloud.asset.v1p2beta1.IDeleteFeedRequest | null | undefined,
      {} | null | undefined
    >
  ): Promise<
    [
      protos.google.protobuf.IEmpty,
      protos.google.cloud.asset.v1p2beta1.IDeleteFeedRequest | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers['x-goog-request-params'] =
      gax.routingHeader.fromParams({
        name: request.name || '',
      });
    this.initialize();
    return this.innerApiCalls.deleteFeed(request, options, callback);
  }

  // --------------------
  // -- Path templates --
  // --------------------

  /**
   * Return a fully-qualified folderFeed resource name string.
   *
   * @param {string} folder
   * @param {string} feed
   * @returns {string} Resource name string.
   */
  folderFeedPath(folder: string, feed: string) {
    return this.pathTemplates.folderFeedPathTemplate.render({
      folder: folder,
      feed: feed,
    });
  }

  /**
   * Parse the folder from FolderFeed resource.
   *
   * @param {string} folderFeedName
   *   A fully-qualified path representing folder_feed resource.
   * @returns {string} A string representing the folder.
   */
  matchFolderFromFolderFeedName(folderFeedName: string) {
    return this.pathTemplates.folderFeedPathTemplate.match(folderFeedName)
      .folder;
  }

  /**
   * Parse the feed from FolderFeed resource.
   *
   * @param {string} folderFeedName
   *   A fully-qualified path representing folder_feed resource.
   * @returns {string} A string representing the feed.
   */
  matchFeedFromFolderFeedName(folderFeedName: string) {
    return this.pathTemplates.folderFeedPathTemplate.match(folderFeedName).feed;
  }

  /**
   * Return a fully-qualified organizationFeed resource name string.
   *
   * @param {string} organization
   * @param {string} feed
   * @returns {string} Resource name string.
   */
  organizationFeedPath(organization: string, feed: string) {
    return this.pathTemplates.organizationFeedPathTemplate.render({
      organization: organization,
      feed: feed,
    });
  }

  /**
   * Parse the organization from OrganizationFeed resource.
   *
   * @param {string} organizationFeedName
   *   A fully-qualified path representing organization_feed resource.
   * @returns {string} A string representing the organization.
   */
  matchOrganizationFromOrganizationFeedName(organizationFeedName: string) {
    return this.pathTemplates.organizationFeedPathTemplate.match(
      organizationFeedName
    ).organization;
  }

  /**
   * Parse the feed from OrganizationFeed resource.
   *
   * @param {string} organizationFeedName
   *   A fully-qualified path representing organization_feed resource.
   * @returns {string} A string representing the feed.
   */
  matchFeedFromOrganizationFeedName(organizationFeedName: string) {
    return this.pathTemplates.organizationFeedPathTemplate.match(
      organizationFeedName
    ).feed;
  }

  /**
   * Return a fully-qualified projectFeed resource name string.
   *
   * @param {string} project
   * @param {string} feed
   * @returns {string} Resource name string.
   */
  projectFeedPath(project: string, feed: string) {
    return this.pathTemplates.projectFeedPathTemplate.render({
      project: project,
      feed: feed,
    });
  }

  /**
   * Parse the project from ProjectFeed resource.
   *
   * @param {string} projectFeedName
   *   A fully-qualified path representing project_feed resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromProjectFeedName(projectFeedName: string) {
    return this.pathTemplates.projectFeedPathTemplate.match(projectFeedName)
      .project;
  }

  /**
   * Parse the feed from ProjectFeed resource.
   *
   * @param {string} projectFeedName
   *   A fully-qualified path representing project_feed resource.
   * @returns {string} A string representing the feed.
   */
  matchFeedFromProjectFeedName(projectFeedName: string) {
    return this.pathTemplates.projectFeedPathTemplate.match(projectFeedName)
      .feed;
  }

  /**
   * Terminate the gRPC channel and close the client.
   *
   * The client will no longer be usable and all future behavior is undefined.
   * @returns {Promise} A promise that resolves when the client is closed.
   */
  close(): Promise<void> {
    this.initialize();
    if (!this._terminated) {
      return this.assetServiceStub!.then(stub => {
        this._terminated = true;
        stub.close();
      });
    }
    return Promise.resolve();
  }
}
