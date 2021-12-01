use anchor_lang::prelude::*;

declare_id!("HmZ5eqwP6CT6XUSFq2J39o4jfRJk91rHPSKnZqzBFsLx");

#[program]
pub mod error {
    use super::*;
    pub fn hello(_ctx: Context<Hello>) -> Result<()> {
        Err(ErrorCode::Hello.into())
    }
}

#[derive(Accounts)]
pub struct Hello {}

#[error]
pub enum ErrorCode {
    #[msg("This is an error message clients will automatically display")]
    Hello,
}