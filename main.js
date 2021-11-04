#!/usr/bin/env node

const { execSync } = require( 'child_process' );
const yargs = require( 'yargs' );
const { hideBin: yargsHideBin } = require('yargs/helpers')
const fs = require( 'fs' );
const path = require( 'path' );
const os = require( 'os' );


function main() {
	const args = parseArgs();
	execGitFlowReleaseFinish( args );
}

function parseArgs() {
	return yargs( yargsHideBin( process.argv ) )
		.strict()
		.usage( '$0 [--dry-run] [--help|-h] [--release-message|-m <release-message>] <version>',
			"Performs a `git flow release finish` without any prompts.",
			(yargs) => {
				yargs.positional( 'version', {
					desc: "The version number of the release."
				} );
		} )
		.option( 'dry-run', {
			type: "boolean",
			desc: "Just log what would happen but don't do it."
		} )
		.option( 'release-message', {
			desc: "The message to be used for the release. Can contain the placeholder {{version}} which is replaced with "
				+ "the version.",
			default: "Release of {{version}}",
			alias: 'm'
		} )
		.version( false )
		.help( 'help' )
		.alias( 'help', 'h' )
		.argv;
}

function execGitFlowReleaseFinish( args )
{
	const tempDir = fs.mkdtempSync( path.join( os.tmpdir(), 'gitFlowSilentRelease-' ) );
	try
	{
		const messageFile = path.join( tempDir, 'message.txt' );
		const releaseMessage = args.releaseMessage.replace( /\{\{version\}\}/g, args.version );

		fs.writeFileSync( messageFile, releaseMessage );

		if( args.dryRun ) {
			console.log( `! git flow release finish -f "${messageFile}"` );
			console.log( `// with content of "${messageFile}" being:\n${releaseMessage}` );
			return;
		}

		execSync( `git flow release finish -f "${messageFile}"`, {
			env: Object.assign( {}, process.env, {
				GIT_MERGE_AUTOEDIT: 'no'
			} )
		} );
	}
	finally {
		fs.rmSync( tempDir, { recursive: true, maxRetries: 3 } );
	}
}

main();

