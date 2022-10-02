import { SystemThemeOption } from "@fargusplumdoodle/themes";

interface SerializedModel {
  id?: number;
}

export interface SerializedTransaction extends SerializedModel {
  amount: number;
  description: string;
  budget: number;
  date: string;
  income: boolean;
  transfer: boolean;
  tags: SerializedTag[];
  created?: Date;
  modified?: Date;
}

export interface SerializedTag extends SerializedModel {
  rank?: number;
  name: string;
  common_budget?: number | null;
  common_transaction_amount?: number | null;
}

export interface SerializedBudget extends SerializedModel {
  name: string;
  monthly_allocation: number;
  balance: number;
  user?: number;
  rank?: number;
  parent: number | null;
  is_node?: boolean;
  income_per_month: number;
  outcome_per_month: number;
}

export interface SerializedUserInfo {
  expected_monthly_net_income: number;
  theme: SystemThemeOption;
  darkMode: boolean;
}
