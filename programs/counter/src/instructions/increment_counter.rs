use anchor_lang::prelude::*;
use crate::collections::Counter;

#[derive(Accounts)]
pub struct IncrementCounter<'info>{
  #[account(
    mut,
    has_one = authority,
  )]
  pub counter: Box<Account<'info,Counter>>,
  pub authority: Signer<'info>,

}

pub fn handler(ctx: Context<IncrementCounter>) -> ProgramResult {
  ctx.accounts.counter.data += 1;
  Ok(())
}
