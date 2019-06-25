'use strict';
// pm2 start pm2.config.js env, env_test
module.exports = {
    apps: [
        {
            name: "UBI",
            script: "./build/app.js",
            watch: true, // 파일이 변경되면 자동으로 재실행 (true || false)
            env: {
                "NODE_ENV": "development"
            },
            env_production: {
                "NODE_ENV": "production"
            },
            env_test: {
                "NODE_ENV": "test"
            }
        }
    ]
};
