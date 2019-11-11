const routerList = [];
const routeContext = require.context('./modules/', true, /\.js$/);

// 404
let notFound = null;

routeContext.keys().forEach((routerFile) => {
  const routerConfig = routeContext(routerFile);
  if (Array.isArray(routerConfig.default)) {
    Array.prototype.push.apply(routerList, routerConfig.default);
  } else {
    notFound = routerConfig.default;
  }
});

routerList.push(notFound);

export default routerList;
