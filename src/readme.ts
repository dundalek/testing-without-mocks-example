import { App } from "./app";
import { CommandLine } from "./infrastructure/command_line";
import * as rot13 from "./logic/rot13";

// ## Application layer
App
  // Main application entry point
  ; App.prototype.run

// ## Instrastructure layer
// Infrastructure wrapper for reading command-line arguments and writing to `stdout`
CommandLine
  // Provides access to command-line arguments
  ; CommandLine.prototype.args
  // Wrapper for writing output
  ; CommandLine.prototype.writeOutput

// ## Logic layer
// Implementation of ROT-13 encoding
rot13.transform
