import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class WatchmodeApi implements ICredentialType {
	name = 'watchmodeApi'
	displayName = 'Watchmode API';
	// Uses the link to this tutorial as an example
	// Replace with your own docs links when building your own nodes
	documentationUrl = 'https://api.watchmode.com/dashboard';
	properties: INodeProperties[] = [
		{
			displayName: 'Api Key',
			name: 'apiKey',
			type: 'string',
      typeOptions: {
        password: true,
      },
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			qs: {
				'apiKey': '={{$credentials.apiKey}}'
			}
		},
	};
}