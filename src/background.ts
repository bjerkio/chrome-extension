const allResourceTypes = Object.values(
  chrome.declarativeNetRequest.ResourceType,
);

const hosts = ['bjerk.io', 'bjerk.dev', 'branches.no'];

const rules: chrome.declarativeNetRequest.Rule[] = [
  ...hosts.map((host, i) => ({
    id: i + 1,
    priority: 1,
    action: {
      type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
      requestHeaders: [
        {
          operation: chrome.declarativeNetRequest.HeaderOperation.SET,
          header: 'x-team-id',
          value: 'bjerk',
        },
      ],
    },
    condition: {
      urlFilter: `*.${host}/*`,
      resourceTypes: allResourceTypes,
    },
  })),
];

void chrome.declarativeNetRequest.updateDynamicRules({
  removeRuleIds: rules.map(rule => rule.id), // remove existing rules
  addRules: rules,
});

// TODO: Figure out a way to ensure cookies are set when they are unset.
hosts.map(host =>
  chrome.cookies.set({
    url: `https://${host}`,
    name: 'x-team-id',
    value: 'bjerk',
  }),
);
