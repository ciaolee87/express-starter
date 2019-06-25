#!/usr/bin/env bash

ENV=$1


echo "빌드"
tsc
ssh -i aws_ciaolee87.pem ec2-user@ireceipt_aws.ciaosgarage.xyz "
    hostname;
	source ~/.bash_profile;

    echo "PM2 종료"
	pm2 kill;

	echo "엡 삭제";
	rm -rf ./iReceipt/build
	rm -rf ./iReceipt/package.json
	rm -rf ./iReceipt/resources
"

scp -i aws_ciaolee87.pem -r ./build              ec2-user@ireceipt_aws.ciaosgarage.xyz:~/iReceipt/build
scp -i aws_ciaolee87.pem -r ./package.json       ec2-user@ireceipt_aws.ciaosgarage.xyz:~/iReceipt/package.json
scp -i aws_ciaolee87.pem -r ./resources          ec2-user@ireceipt_aws.ciaosgarage.xyz:~/iReceipt/resources

echo "앱 복사 완료"

ssh -i aws_ciaolee87.pem ec2-user@ireceipt_aws.ciaosgarage.xyz "
    hostname;
	source ~/.bash_profile;

	cd iReceipt;
	echo "NPM 인스톨 시작";
	npm i;

    echo "서버모드 ${ENV}";
	echo NODE_ENV=$ENV >> ./resources/config/.env;

	echo "PM2 시작";
	pm2 start ./build/wsApp.js;
"
