const { execSync } = require( 'child_process' );
const yargs = require( 'yargs' );
const { hideBin: yargsHideBin } = require('yargs/helpers')


const args = yargs( yargsHideBin( process.argv ) )
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

const releaseMessage = args.releaseMessage.replace( /\{\{version\}\}/g, args.version )
	.replace( /\\/g, '\\\\' )
	.replace( /"/g, '\\"' );

if( args.dryRun ) {
	console.log( `git flow release finish -m "${releaseMessage}"` );
	process.exit( 0 );
}

execSync( `git flow release finish -m "${releaseMessage}"`, {
	env: Object.assign( {}, process.env, {
		GIT_MERGE_AUTOEDIT: 'no'
	} )
} );
