const React = require("react");
const Layout = require("./Layout");

function Home({ login, data }) {
  return (
    <Layout login={login}>
      <div className="mainContainer">
        <div id="recipesContainer"></div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      <script defer src="/js/recipesApi.js"></script>
    </Layout>
  );
}

module.exports = Home;
