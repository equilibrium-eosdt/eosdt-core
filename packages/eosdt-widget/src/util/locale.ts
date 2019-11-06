interface LocaleTemplateParams {
  locale?: Map<string, string[]>;
  extract?: Map<string, string[]>;
}

export const createLocaleTemplateFunction = (params: LocaleTemplateParams) => (
  parts: TemplateStringsArray,
  ...args: any[]
) => {
  const key = parts.join("${...}");

  if (params.extract) {
    params.extract.set(key, parts as any as string[]);
  }

  let localeParts = parts;

  if (params.locale && params.locale.has(key)) {
    localeParts = (params.locale.get(key)! as any as TemplateStringsArray);
  }

  return localeParts.reduce((str, part, i) => {
    if (!args[i]) {
      return `${str}${part}`;
    }

    return `${str}${part}${args[i]}`;
  }, "");
};
