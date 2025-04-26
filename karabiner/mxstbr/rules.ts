import fs from "fs";
import { KarabinerRules } from "./types";
import { app, createHyperSubLayers, open } from "./utils";
import { createCtrlCmdSubLayers } from "./utils2";

const rules: KarabinerRules[] = [
  // I've been using my pinky way too often for all they keyboard
  // shortcuts and after months, my hand is starting to hurt, moving the
  // hyper key from caps_lock to my thumb
  //
  // I tried using spacebar as the hyper key but cannot type well
  //
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "left option -> Hyper Key",
        from: {
          key_code: "left_option",
        },
        to: [
          {
            key_code: "left_shift",
            modifiers: ["left_command", "left_control", "left_option"],
          },
        ],
        type: "basic",
      },
    ],
  },
  // {
  //   description: "Hyper Key (⌃⌥⇧⌘)",
  //   manipulators: [
  //     {
  //       description: "right option -> Hyper Key",
  //       from: {
  //         key_code: "right_option",
  //       },
  //       to: [
  //         {
  //           key_code: "left_shift",
  //           modifiers: ["left_command", "left_control", "left_option"],
  //         },
  //       ],
  //       type: "basic",
  //     },
  //   ],
  // },
  //
  {
    description: "down_arrow -> tmux 3rd session",
    manipulators: [
      {
        from: {
          key_code: "down_arrow",
          modifiers: {
            mandatory: ["command"],
          },
        },
        to: [
          {
            shell_command:
              "open btt://execute_assigned_actions_for_trigger/?uuid=79CE855A-4DEA-4340-9878-4C33328B6B85",
          },
        ],
        type: "basic",
      },
    ],
  },

  {
    description: "right_arrow -> sticky notes",
    manipulators: [
      {
        from: {
          key_code: "right_arrow",
          modifiers: {
            mandatory: ["command"],
          },
        },
        to: [
          {
            shell_command: "open -a 'kitty.app'",
          },
        ],
        type: "basic",
      },
    ],
  },
  {
    description: "left_arrow -> cmd+tab+tab",
    manipulators: [
      {
        from: {
          key_code: "left_arrow",
          modifiers: {
            mandatory: ["command"],
          },
        },
        to: [
          {
            key_code: "tab",
            modifiers: ["command"],
          },
          {
            key_code: "tab",
            modifiers: ["command"],
          },
        ],
        type: "basic",
      },
    ],
  },
  {
    description: "up_arrow -> tmux visual mode",
    manipulators: [
      {
        from: {
          key_code: "up_arrow",
          modifiers: {
            mandatory: ["command"],
          },
        },
        to: [
          {
            shell_command:
              "open btt://execute_assigned_actions_for_trigger/?uuid=F789C9F8-0F29-4922-9179-BFE03D226176",
          },
        ],
        type: "basic",
      },
    ],
  },
  ...createCtrlCmdSubLayers({
    // Direct command
    k: {
      to: [
        {
          key_code: "open_bracket",
          modifiers: ["left_command", "left_shift"],
        },
      ],
    },
    // Move to right (or down) tab in browsers
    j: {
      to: [
        {
          key_code: "close_bracket",
          modifiers: ["left_command", "left_shift"],
        },
      ],
    },
  }),

  ...createHyperSubLayers({
    // All the following combinations require the "hyper" key as well
    left_shift: {
      t: app("Ghostty"),
      7: app("Slack"),
      b: app("Arc"),
      9: app("1Password"),
      8: app("Line"),
      c: app("Claude"),
      g: app("ChatGPT"),
      6: app("Discord"),
      0: app("Lens"),
    },
    // a:{
    //   j: app("Ghostty")
    // },
    left_control: {
      // home
      h: open(
        "btt://execute_assigned_actions_for_trigger/?uuid=F431526A-E836-451C-BD36-67AB7DF7CAC2"
      ),
      // dotfiles-latest
      j: open(
        "btt://execute_assigned_actions_for_trigger/?uuid=E2BEB425-38A3-46D8-AAF8-067CA979D4FB"
      ),
      // kyc
      k: open(
        "btt://execute_assigned_actions_for_trigger/?uuid=7B386F00-BDBD-448F-A413-E37952E219A7"
      ),
      // lucas
      l: open(
        "btt://execute_assigned_actions_for_trigger/?uuid=1893BEBE-DC99-41CC-9BE6-74B66E3BBB2C"
      ),
      // scripts
      semicolon: open(
        "btt://execute_assigned_actions_for_trigger/?uuid=9E98F83C-C4C4-4B9B-AFF7-03AAAF2939A5"
      ),
      // containerdata
      y: open(
        "btt://execute_assigned_actions_for_trigger/?uuid=27E17BF8-1B16-41BF-A7C1-3DAF6B706340"
      ),
      // containerdata_nfs
      p: open(
        "btt://execute_assigned_actions_for_trigger/?uuid=55A10BEE-B776-4D93-B5ED-024A58595D93"
      ),
      // obsidian_main
      u: open(
        "btt://execute_assigned_actions_for_trigger/?uuid=2FF1FD5D-72C2-42CA-B6AD-05A4DC3CEE0C"
      ),
      // php
      i: open(
        "btt://execute_assigned_actions_for_trigger/?uuid=03F1E256-FF80-43BA-873C-195628FA5996"
      ),
      // containerdata-public
      o: open(
        "btt://execute_assigned_actions_for_trigger/?uuid=13ED33CA-99DF-4782-BDA6-E01BF3FF0DCC"
      ),
      // // Find
      // n: open(
      //   "btt://execute_assigned_actions_for_trigger/?uuid=92398D5C-B95F-4E31-9CB9-1E3E732AF1C0"
      // ),
      // // Find goto
      // m: open(
      //   "btt://execute_assigned_actions_for_trigger/?uuid=88FB8FF9-6237-45FE-8717-675540891749"
      // ),
      // // daily note
      r: open(
        "btt://execute_assigned_actions_for_trigger/?uuid=9B82DF9D-2DE2-4872-903A-D3C17EE9D555"
      ),
      e: open(
        "btt://execute_assigned_actions_for_trigger/?uuid=3DEAE844-CD5B-4695-A58D-AC7CFA935D46"
      ),
      // Golang dir
      open_bracket: open(
        "btt://execute_assigned_actions_for_trigger/?uuid=70963A3C-7982-4BB4-A8E0-5181EC216383"
      ),
      // ssh
      n: open(
        "btt://execute_assigned_actions_for_trigger/?uuid=6C578F42-B350-46B1-A7BE-D1869A081B86"
      ),
      // ~/.ssh/config find
      m: open(
        "btt://execute_assigned_actions_for_trigger/?uuid=B649548D-C750-408D-97E8-74F58B7F504D"
      ),
    },

    // r = "Raycast"
    r: {
      j: open("raycast://extensions/lardissone/raindrop-io/search"),
      k: open("raycast://extensions/mblode/google-search/index"),
      l: open("raycast://extensions/raycast/navigation/switch-windows"),
      semicolon: open("raycast://extensions/vishaltelangre/google-drive/index"),
      quote: open("raycast://extensions/mathieudutour/wolfram-alpha/index"),
      u: open("raycast://extensions/raycast/apple-reminders/create-reminder"),
      i: open("raycast://extensions/raycast/apple-reminders/my-reminders"),
      o: open("raycast://extensions/raycast/github/search-repositories"),
      p: open("raycast://extensions/nhojb/brew/search"),
      h: open("raycast://extensions/mattisssa/spotify-player/search"),
      e: open(
        "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"
      ),
    },
    c: {
      n: open(
        "btt://execute_assigned_actions_for_trigger/?uuid=6793CE15-C70A-43E7-ADA9-479DF1539A39"
      ),
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          complex_modifications: {
            rules,
          },
          fn_function_keys: [
            {
              from: { key_code: "f6" },
              to: [{ consumer_key_code: "rewind" }],
            },
            {
              from: { key_code: "f7" },
              to: [{ consumer_key_code: "play_or_pause" }],
            },
            {
              from: { key_code: "f8" },
              to: [{ consumer_key_code: "fast_forward" }],
            },
            {
              from: { key_code: "f9" },
              to: [{ consumer_key_code: "volume_decrement" }],
            },
            {
              from: { key_code: "f10" },
              to: [{ consumer_key_code: "volume_increment" }],
            },
            {
              from: { key_code: "f11" },
              to: [{ key_code: "f11" }],
            },
            {
              from: { key_code: "f12" },
              to: [{ key_code: "f12" }],
            },
          ],
          name: "Default",
          selected: true,
          virtual_hid_keyboard: { keyboard_type_v2: "ansi" },
        },
      ],
    },
    null,
    2
  )
);
