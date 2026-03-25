use std::collections::HashMap;
use crate::storage_control::traits::TimeStamped;

pub struct StorageControl<T> {
    pub data: HashMap<String, Vec<T>>,
    pub max_items: usize,
    pub ttl: u64,
}

impl<T> StorageControl<T>
where
    T: TimeStamped + Clone,
{
    pub fn new(max_items: usize, ttl: u64) -> Self {
        Self {
            data: HashMap::new(),
            max_items,
            ttl,
        }
    }

    pub fn add(&mut self, key: String, item: T, current_time: u64) {
        self.cleanup_key(&key, current_time);

        let items = self.data.entry(key).or_default();

        if items.len() >= self.max_items {
            items.remove(0);
        }

        items.push(item);
    }

    pub fn cleanup_key(&mut self, key: &String, current_time: u64) {
        if let Some(items) = self.data.get_mut(key) {
            items.retain(|item| current_time - item.get_timestamp() <= self.ttl);
        }
    }

    pub fn cleanup_all(&mut self, current_time: u64) {
        for items in self.data.values_mut() {
            items.retain(|item| current_time - item.get_timestamp() <= self.ttl);
        }
    }

    pub fn get(&self, key: &String) -> Option<&Vec<T>> {
        self.data.get(key)
    }
}