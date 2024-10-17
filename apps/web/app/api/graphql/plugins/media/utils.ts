export const decodeBase64Image = (base64String: string) => {
  const base64Data = base64String.replace(/^data:.+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');

  return buffer;
};



export function AfterHook(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (this: any, ...args: any[]) {
    try {
      // before hook
      // after hook
      const result = originalMethod.apply(this, args);
      if (result instanceof Promise) {
        return result.then(async (res: any) => {
          await new Promise((resolve, reject) => {
            this.mercury.hook.execAfter(
              `PLATFORM_INITIALIZE`,
              {name: '', options: {}, user: {id: "1", profile: "SystemAdmin"}},
              [],
              function (error: any) {
                if (error) {
                  // Reject the Promise if there is an error
                  reject(error);
                } else {
                  // Resolve the Promise if there is no error
                  resolve(true);
                }
              }
            );
          });
          return res;
        });
      } else {
        return result;
      }
    } catch (error: any) {
      console.log('Platform Error: ', error);
    }
  };

  return descriptor;
}
