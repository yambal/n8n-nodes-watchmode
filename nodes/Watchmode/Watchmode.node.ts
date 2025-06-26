import type {
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

/**
 * 宣言型ノードの場合、通常はINodeTypeとINodeTypeDescriptionがインポートされます。
 * ノードの主要なロジックを定義するクラスを作成し、INodeTypeインターフェースを実装します。
 */
export class Watchmode implements INodeType {
  // ノードのメタデータを定義します。INodeTypeDescription型を持つ
	description: INodeTypeDescription = {
		displayName: 'Watchmode',
		name: 'watchmode',
    icon: 'file:yahooJpYolp.svg',
		group: ['transform'],     //  ワークフローの実行時にノードがどのように振る舞うか trigger, schedule, input, output
		version: 1,
    subtitle: '={{$parameter["operation"]}}',
		description: 'Map and local information API provided by Yahoo! Maps for developers',
		defaults: {
			name: 'Watchmode',
		},
		inputs: [NodeConnectionType.Main],  // 入力コネクタの名前を定義します。単一のコネクタの場合は['main']と指定します
		outputs: [NodeConnectionType.Main],  // 出力コネクタの名前を定義します。単一のコネクタの場合は['main']と指定します
    credentials: [  // ノードが使用する認証情報を定義します。
      {
        name: 'watchmodeApi',
        required: true,
      },
    ],
    requestDefaults: {  // ノードが行うAPI呼び出しの基本的な情報を設定します。baseURLは必須で、共通のheadersやurlなどを指定できます
      baseURL: 'https://api.watchmode.com',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
		properties: [ // ノードの動作を定義する重要な部分,
      {
        displayName: 'Operation', // 操作オブジェクト: 特定のリソースに対して実行できる「操作」（例: "Get all"）を定義します。options配列内に各操作の動作（ルーティング、REST動詞など）を記述します。
        name: 'operation',
        type: 'options',
        default: 'Sources',
        noDataExpression: true,
        options: [
          {
            name: 'Genres',
            value: 'Genres',
            action: 'Genres',
            description: 'Return a mapping of genre names and IDs. Some genres have a tmdb_id, which is the corresponding genre ID on TheMovieDB.org API.',
            routing: {
              request: {
                method: 'GET',
                url: '/v1/genres/',
                qs: {
                  output: 'json',
                }
              }
            }
          },
          {
            name: 'Networks',
            value: 'Networks',
            action: 'Networks',
            description: 'Return a listing of all TV networks that may be returned for a title in the /title endpoint',
            routing: {
              request: {
                method: 'GET',
                url: '/v1/networks/',
                qs: {
                  output: 'json',
                }
              }
            }
          },
          {
            name: 'Search',
            value: 'Search',
            action: 'Search',
            description: 'Search for titles or people by name or external ID (e.g. IMDb, TMDB)',
            routing: {
              request: {
                method: 'GET',
                url: '/v1/search/',
                qs: {
                  output: 'json',
                }
              }
            }
          },
          {
            name: 'Sources',
            value: 'Sources',
            action: 'Sources',
            description: 'Provides a list of streaming sources with region info, logos, and app links, including subscription, rental, and free services',
            routing: {
              request: {
                method: 'GET',
                url: '/v1/sources/',
                qs: {
                  output: 'json',
                }
              }
            }
          },
          {
            name: 'Streaming Releases',
            value: 'Streaming Releases',
            action: 'Streaming releases',
            description: 'See a list of new and upcoming releases on major streaming services, with info on whether they’re originals',
            routing: {
              request: {
                method: 'GET',
                url: '/v1/releases/',
                qs: {
                  output: 'json',
                }
              }
            }
          },
          {
            name: 'Title Streaming Sources',
            value: 'Title Streaming Sources',
            action: 'Title streaming sources',
            description: 'Check where a title is available to stream, rent, or buy in a chosen region. For TV shows, you can filter by season or episode.',
            routing: {
              request: {
                method: 'GET',
                //url: '=/v1/title/{title_id}/sources/',
                qs: {
                  output: 'json',
                }
              }
            }
          },
        ]
      },
      {
				displayName: 'Search Field',
				name: 'searchField',
				type: 'string',
        default: 'name',
        description: 'Specifies the field to search: choose from imdb_id, tmdb_person_id, tmdb_movie_id, tmdb_tv_id, or name to find matching titles or people',
        noDataExpression: false,
        required: true,
        routing: {
          request: {
            qs: {
              search_field: '={{$parameter.searchField}}',
            }
          }
        },
        displayOptions: {
          show: {
            operation: [
              'Search',
            ]
          }
        }
      },
      {
				displayName: 'Search Value',
				name: 'searchValue',
				type: 'string',
        default: 'Ed Wood',
        description: 'Specifies the value to search for, based on the chosen search_field. For example, if search_field is imdb_id, use an IMDb ID like tt0944947.',
        noDataExpression: false,
        required: true,
        routing: {
          request: {
            qs: {
              search_value: '={{$parameter.searchValue}}',
            }
          }
        },
        displayOptions: {
          show: {
            operation: [
              'Search',
            ]
          }
        }
      },
      {
				displayName: 'Types',
				name: 'types',
				type: 'string',
        default: '',
        description: 'Specifies the type(s) to return. Use tv, movie, or person, or a comma-separated list (e.g. movie,tv) to filter results by type.',
        noDataExpression: false,
        routing: {
          request: {
            qs: {
              search_value: '={{$parameter.types}}',
            }
          }
        },
        displayOptions: {
          show: {
            operation: [
              'Search',
            ]
          }
        }
      },
      {
				displayName: 'Title ID',
				name: 'titleId',
				type: 'string',
        default: '',
        description: 'Replace {title_id} with a Watchmode ID (costs 1), or use an IMDB/TMDB ID (costs 2) like movie-278 or tv-1396 to get source info',
        noDataExpression: false,
        required: true,
        routing: {
          request: {
            url: '=/v1/title/{{$parameter.titleId}}/sources/'
          }
        },
        displayOptions: {
          show: {
            operation: [
              'Title Streaming Sources',
            ]
          }
        }
      }
		],
    usableAsTool: true,
	}
}
