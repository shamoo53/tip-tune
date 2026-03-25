pub trait TimeStamped {
    fn get_timestamp(&self) -> u64;
}