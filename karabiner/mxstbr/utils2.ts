import { To, KeyCode, Manipulator, KarabinerRules } from "./types";

/**
 * Custom way to describe a command in a layer
 */
export interface LayerCommand {
  to: To[];
  description?: string;
}

type CtrlCmdKeySublayer = {
  [key_code in KeyCode]?: LayerCommand | NestedSublayer;
};

interface NestedSublayer {
  [key: string]: LayerCommand;
}

/**
 * Create a Ctrl+Cmd Key sublayer, where every command is prefixed with a key
 * e.g. Ctrl + Cmd + O ("Open") is the "open applications" layer
 */
export function createCtrlCmdSubLayer(
  sublayer_key: KeyCode,
  commands: CtrlCmdKeySublayer,
  allSubLayerVariables: string[]
): Manipulator[] {
  const subLayerVariableName = generateSubLayerVariableName(sublayer_key);

  const baseManipulator = {
    description: `Toggle Ctrl+Cmd sublayer ${sublayer_key}`,
    type: "basic" as const,
    from: {
      key_code: sublayer_key,
      modifiers: {
        mandatory: ["left_command", "left_control"],
      },
    },
    to_after_key_up: [
      {
        set_variable: {
          name: subLayerVariableName,
          value: 0,
        },
      },
    ],
    to: [
      {
        set_variable: {
          name: subLayerVariableName,
          value: 1,
        },
      },
    ],
    conditions: allSubLayerVariables
      .filter((subLayerVariable) => subLayerVariable !== subLayerVariableName)
      .map((subLayerVariable) => ({
        type: "variable_if",
        name: subLayerVariable,
        value: 0,
      })),
  };

  const commandManipulators = Object.entries(commands).flatMap(
    ([key, value]) => {
      if ("to" in value) {
        // It's a direct LayerCommand
        return [
          {
            ...value,
            type: "basic" as const,
            from: {
              key_code: key as KeyCode,
              modifiers: {
                mandatory: ["any"],
              },
            },
            conditions: [
              {
                type: "variable_if",
                name: subLayerVariableName,
                value: 1,
              },
            ],
          },
        ];
      } else {
        // It's a nested sublayer
        return Object.entries(value).map(([nestedKey, nestedCommand]) => ({
          ...nestedCommand,
          type: "basic" as const,
          from: {
            key_code: nestedKey as KeyCode,
            modifiers: {
              mandatory: [key as KeyCode],
            },
          },
          conditions: [
            {
              type: "variable_if",
              name: subLayerVariableName,
              value: 1,
            },
          ],
        }));
      }
    }
  );

  return [baseManipulator, ...commandManipulators];
}

/**
 * Create all Ctrl+Cmd sublayers with support for nested configurations
 */
export function createCtrlCmdSubLayers(subLayers: {
  [key_code in KeyCode]?: CtrlCmdKeySublayer | LayerCommand;
}): KarabinerRules[] {
  const allSubLayerVariables = (
    Object.keys(subLayers) as (keyof typeof subLayers)[]
  ).map((sublayer_key) => generateSubLayerVariableName(sublayer_key));

  return Object.entries(subLayers).map(([key, value]) =>
    "to" in value
      ? {
          description: `Ctrl + Cmd + ${key}`,
          manipulators: [
            {
              ...value,
              type: "basic" as const,
              from: {
                key_code: key as KeyCode,
                modifiers: {
                  mandatory: ["left_command", "left_control"],
                },
              },
            },
          ],
        }
      : {
          description: `Ctrl + Cmd sublayer "${key}"`,
          manipulators: createCtrlCmdSubLayer(
            key as KeyCode,
            value,
            allSubLayerVariables
          ),
        }
  );
}

function generateSubLayerVariableName(key: KeyCode) {
  return `ctrlcmd_sublayer_${key}`;
}

/**
 * Shortcut for "open" shell command
 */
export function open(what: string): LayerCommand {
  return {
    to: [
      {
        shell_command: `open ${what}`,
      },
    ],
    description: `Open ${what}`,
  };
}

/**
 * Shortcut for "Open an app" command (of which there are a bunch)
 */
export function app(name: string): LayerCommand {
  return open(`-a '${name}.app'`);
}
