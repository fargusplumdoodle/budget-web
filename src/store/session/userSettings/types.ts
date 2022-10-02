import { SystemThemeOption } from "@fargusplumdoodle/themes";

export interface ThemeSettings {
  themeName: SystemThemeOption;
  darkMode: boolean;
}

export interface UserSettingsState {
  expected_monthly_net_income: number;
  theme: ThemeSettings;
}
