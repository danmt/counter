use anchor_lang::prelude::*;

mod collections;
mod instructions;

use instructions::*;

declare_id!("G5F93hRQChtDh4RDBVpFkDDaKBXbkruT2xxEUdPAgTMP");

#[program]
pub mod counter {
  use super::*;

  pub fn increment_counter(ctx: Context<IncrementCounter>) -> ProgramResult {
    instructions::increment_counter::handler(ctx)
  }
  pub fn init_counter(ctx: Context<InitCounter>) -> ProgramResult {
    instructions::init_counter::handler(ctx)
  }
}
