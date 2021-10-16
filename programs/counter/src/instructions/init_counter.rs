use anchor_lang::prelude::*;
use crate::collections::Counter;

#[derive(Accounts)]
pub struct InitCounter<'info>{
  #[account(
    mut,
  )]
  pub authority: Signer<'info>,
  pub system_program: Program<'info, System>,
    #[account(
    init,
    space = 8 + 48,
    payer = authority,
  )]
  pub counter: Box<Account<'info,Counter>>,

}

pub fn handler(ctx: Context<InitCounter>) -> ProgramResult {
  ctx.accounts.counter.data = 0;
  ctx.accounts.counter.authority = ctx.accounts.authority.key();
  Ok(())
}
