"use strict";
var BP3D;
(function (BP3D) {
    var Core;
    (function (Core) {
        /** Enumeration of log contexts. */
        var ELogContext;
        (function (ELogContext) {
            /** Log nothing. */
            ELogContext[ELogContext["None"] = 0] = "None";
            /** Log all. */
            ELogContext[ELogContext["All"] = 1] = "All";
            /** 2D interaction */
            ELogContext[ELogContext["Interaction2d"] = 2] = "Interaction2d";
            /** Interior items */
            ELogContext[ELogContext["Item"] = 3] = "Item";
            /** Wall (connectivity) */
            ELogContext[ELogContext["Wall"] = 4] = "Wall";
            /** Room(s) */
            ELogContext[ELogContext["Room"] = 5] = "Room";
        })(ELogContext = Core.ELogContext || (Core.ELogContext = {}));
        /** Enumeration of log levels. */
        var ELogLevel;
        (function (ELogLevel) {
            /** An information. */
            ELogLevel[ELogLevel["Information"] = 0] = "Information";
            /** A warning. */
            ELogLevel[ELogLevel["Warning"] = 1] = "Warning";
            /** An error. */
            ELogLevel[ELogLevel["Error"] = 2] = "Error";
            /** A fatal error. */
            ELogLevel[ELogLevel["Fatal"] = 3] = "Fatal";
            /** A debug message. */
            ELogLevel[ELogLevel["Debug"] = 4] = "Debug";
        })(ELogLevel = Core.ELogLevel || (Core.ELogLevel = {}));
        /** The current log context. To be set when initializing the Application. */
        Core.logContext = ELogContext.None;
        /** Pre-check if logging for specified context and/or level is enabled.
         * This may be used to avoid compilation of complex logs.
         * @param context The log context to be verified.
         * @param level The log level to be verified.
         * @returns If this context/levels is currently logged.
         */
        function isLogging(context, level) {
            return Core.logContext === ELogContext.All || Core.logContext == context
                || level === ELogLevel.Warning || level === ELogLevel.Error
                || level === ELogLevel.Fatal;
        }
        Core.isLogging = isLogging;
        /** Log the passed message in the context and with given level.
         * @param context The context in which the message should be logged.
         * @param level The level of the message.
         * @param message The messages to be logged.
         */
        function log(context, level, message) {
            if (isLogging(context, level) === false) {
                return;
            }
            var tPrefix = "";
            switch (level) {
                case ELogLevel.Information:
                    tPrefix = "[INFO_] ";
                    break;
                case ELogLevel.Warning:
                    tPrefix = "[WARNG] ";
                    break;
                case ELogLevel.Error:
                    tPrefix = "[ERROR] ";
                    break;
                case ELogLevel.Fatal:
                    tPrefix = "[FATAL] ";
                    break;
                case ELogLevel.Debug:
                    tPrefix = "[DEBUG] ";
                    break;
            }
            console.log(tPrefix + message);
        }
        Core.log = log;
    })(Core = BP3D.Core || (BP3D.Core = {}));
})(BP3D || (BP3D = {}));
