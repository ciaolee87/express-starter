'use strict';

module.exports = {
    apps: [
        {
            name: "UBI",
            script: "./build/app.js",
            watch: true, // 파일이 변경되면 자동으로 재실행 (true || false)
            exec_mode: "cluster",
            instances: 0,
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
