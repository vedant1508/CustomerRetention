import React from 'react'
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import './PowerBIReport.css';

const PowerBIReport = () => {
  return (
    <div>
        <PowerBIEmbed
      embedConfig = {{
		type: 'report',   // Supported types: report, dashboard, tile, visual, qna, paginated report and create
		id: '015b44dc-c8f2-4c3c-a698-9b0af6fe8aeb',
		embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=015b44dc-c8f2-4c3c-a698-9b0af6fe8aeb&groupId=5e865d5e-6c90-4717-99f2-77585d03b653&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19',
		accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktRMnRBY3JFN2xCYVZWR0JtYzVGb2JnZEpvNCIsImtpZCI6IktRMnRBY3JFN2xCYVZWR0JtYzVGb2JnZEpvNCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNThjZjA4NzgtOGUzYy00ZWY4LWIwN2ItNDkxMGFlYzhmMDUyLyIsImlhdCI6MTcyNDA0MTY0MCwibmJmIjoxNzI0MDQxNjQwLCJleHAiOjE3MjQwNDU5NjAsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84WEFBQUFzRGVrS3FYNjY0VHBMa29nQVE4ZzZpSFN4VXNVVmRkcmlucUF2eGJXNEsycFBKbFFWeXhmWE9CVlZtNVRYcXJsIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiR3V0dGUiLCJnaXZlbl9uYW1lIjoiQXZpc2hrYXIiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIyNDAyOjNhODA6NDNmMzphZjZkOjVjOGM6Zjk2NjozYzMyOjE2MjIiLCJuYW1lIjoiQXZpc2hrYXIgIEd1dHRlIiwib2lkIjoiYmRiODk3MmMtMmRlZC00ZjllLWE5OWEtMDQwZmY4MjNjN2YyIiwicHVpZCI6IjEwMDMyMDAzQjY5RTMyODMiLCJyaCI6IjAuQVNvQWVBalBXRHlPLUU2d2Uwa1Fyc2p3VWdrQUFBQUFBQUFBd0FBQUFBQUFBQUFxQUZnLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6IkFyMG0tTmpxX2Q5T2hQangzNHF1Zk1LcDlKSmVRNk5velhDZVpVQ1RGZVEiLCJ0aWQiOiI1OGNmMDg3OC04ZTNjLTRlZjgtYjA3Yi00OTEwYWVjOGYwNTIiLCJ1bmlxdWVfbmFtZSI6IjIxNTEyNjM4LmR5cGl0QGR5cHZwLmVkdS5pbiIsInVwbiI6IjIxNTEyNjM4LmR5cGl0QGR5cHZwLmVkdS5pbiIsInV0aSI6IldUSGIzWm9kUTA2YUVqaDBxLWtnQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfaWRyZWwiOiIyMiAxIn0.HPSxuvmDWH1LdgnRyqyGr3cbpgFMkah_qGCAA7o9k186u3MI5AkinSC1Y6ASaTi4yeZC0QCXPBk5SqXvl05xdP-6z7OZRy-WjJSh1AGb2xmDTdPNwAiybRNkOdg14OvDMA6tTBREebP6LRzq5ds9oinn7xzJy6IDH8aOHlc3CKC266AHURKls1Zsk6vBqB1_WxX-022ywsrU9CUGv-yu3XRzPo7BwFjBuhqIQ-WguMNhcSTVozsY3no9rylon_FNUAf9vsF-tTUxK0oTs72A_g1tpY2LyuFpOGKsPcHh-z-NkK9__DTyrzzhAGe295g_ODCUYhYIGK9lrRCIKl_IWw',
		tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
		settings: {
			panes: {
				filters: {
					expanded: false,
					visible: true
				}
			},
		}
	}}

	eventHandlers = {
		new Map([
			['loaded', function () {console.log('Report loaded');}],
			['rendered', function () {console.log('Report rendered');}],
			['error', function (event) {console.log(event.detail);}],
			['visualClicked', () => console.log('visual clicked')],
			['pageChanged', (event) => console.log(event)],
		])
	}

	cssClassName = { "reportClass" }

	getEmbeddedComponent = { (embeddedReport) => {
		window.report = embeddedReport;
	}}
    />
    </div>
  )
}

export default PowerBIReport
