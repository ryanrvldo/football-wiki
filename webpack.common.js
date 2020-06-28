module.exports = {
    entry: {
        vendor: "./src/scripts/vendor.js",
        app: "./src/app.js",
        main: "./src/scripts/view/main.js",
        competitions: "./src/scripts/view/competitions.js",
        teams: "./src/scripts/view/teams.js",
        standings: "./src/scripts/view/standings.js",
        team: "./src/scripts/view/team-detail.js",
        favoriteTeams: "./src/scripts/view/favorite-teams.js",
    },
    module: {
        rules: [{
                test: /\.html$/,
                use: ["html-loader"],
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: `[name].[ext]`,
                        outputPath: "assets/img/",
                    },
                }, ],
            },
            {
                test: /\.(woff|woff2|ttf|eot)(\??.*$|$)/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: `[name]-[contentHash].[ext]`,
                        outputPath: "assets/font/",
                    },
                }, ],
            },
        ],
    },
};