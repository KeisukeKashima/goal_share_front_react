module.exports = {
  reactStrictMode: true,

  // このenvはprocess.envのこと
  // APP_ENVにはnext build時に「staging」等が渡されて(package.jsonのnpm scriptsで設定している)、
  // staging.jsonに「{api_endpoint: hoge.com}」と記載があれば、
  // 他の箇所ではprocess.env.api_endpointと記述すれば、hoge.comが取得できる
  env: {
    ...require(`./enviroment_files/${process.env.APP_ENV || 'default'}.json`),
  },
}
