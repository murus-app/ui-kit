ARG BUILD_STAGE_IMAGE_TAG
FROM "$BUILD_STAGE_IMAGE_TAG"

ARG NPM_DEPLOY_TOKEN
ARG CI_PUBLIC_EMAIL
ARG CI_PUBLIC_ORG_NAME
ARG GIT_COMMIT_HASH

WORKDIR /build
COPY . .

RUN cp ./.npmrc ./package.json ./LICENSE  --target-directory ./dist/

RUN yarn murus-build-cli prepare-npmrc \
      --npmrc_path="./dist/.npmrc" \
      --auth_token="${NPM_DEPLOY_TOKEN}" \
      --org_email="${CI_PUBLIC_EMAIL}" \
      --org_name="${CI_PUBLIC_ORG_NAME}" \
      \
 && yarn murus-build-cli prepare-package-json \
      --commit_hash="${GIT_COMMIT_HASH}" \
      --package_json_path="./dist/package.json"

RUN cd ./dist/ && npm publish --access public --tag latest
