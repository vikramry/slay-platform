import React, { useState, useEffect } from "react";
import _, { map, set } from "lodash";
import * as Babel from "@babel/standalone";

type DyComProps = {
  onClick: () => void;
};

function createComponentFromJSX({
  jsxString,
  modules,
}: {
  jsxString: string;
  modules: Array<any>;
}): React.FC<DyComProps> {
  // Transpile the JSX string to JavaScript using Babel
  const bodyCode = jsxString?.split("// ---Component---")[1].trim();
  const result = Babel.transform(bodyCode, { presets: ["react"] });
  const code = result ? result.code : null;
  const componentFunction = Function.prototype.apply.apply(Function, [
    null,
    ["React", "_", "return " + code],
  ]);

  // Call the function with React and the imported modules as arguments to get the component
  const component = componentFunction.apply(null, [React, ...modules]);

  // Return the component
  return component;
}

async function loadModules(jsxString: string) {
  // Extract import statements from the transpiled code
  const importStatements =
    jsxString?.match(/import\s+.*?from\s+['"].*?['"]/g) || [];

  // // Dynamically import the modules mentioned in the import statements
  const importPromises = importStatements.map((importStatement) => {
    const modulePath = importStatement.match(/['"](.*?)['"]/)?.[1];
    if (!modulePath) throw new Error("modulePath is null");
    // If the modulePath is lodash, import it dynamically
    if (modulePath === "lodash") {
      return import("lodash");
    }

    return import(modulePath);
  });
  // Wait for all the modules to be imported
  const importedModules = await Promise.all(importPromises);
  const modules = map(importedModules, (module) => {
    return module.default;
  });
  return { jsxString, modules };
  // Create a new function that returns the transpiled code
  // Note: This uses 'new Function' which can have security implications
}

function App({ onClick, jsxString }: { onClick: () => void, jsxString: string }) {
  // const [componentUrl, setComponentUrl] = useState<string | null>(null);
  const [nodeModules, setNodeModules] = useState<{
    jsxString: string;
    modules: Array<any>;
  } | null>(null);

  // const [MyComponent, ready] = useLoader(componentUrl);

  useEffect(() => {
    // fetch("https://api.example.com/component-url")
    //   .then((response) => response.text())
    //   .then(loadModules)
    //   .then(setNodeModules);

    (async () => {
      const response = await loadModules(jsxString)
      setNodeModules(response);
    })()


  }, []);
  // const Component = ready && MyComponent?.apply(null, [React, _]);
  const MyComponent = nodeModules ? createComponentFromJSX(nodeModules) : null;
  return (
    <div className="App">
      <header className="App-header" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
        {MyComponent && <MyComponent onClick={onClick} />}
      </header>
    </div>
  );
}

export default App;