export const Operator = {
  Eq: 'eq',                 // Equal to (==)
  Neq: 'neq',               // Not equal (!=)
  Gt: 'gt',                 // Greater than (>)
  Lt: 'lt',                 // Less than (<)
  Gte: 'gte',               // Greater than or equal to (>=)
  Lte: 'lte',               // Less than or equal to (<=)
  In: 'in',                 // In (value is in a list)
  NotIn: 'not_in',          // Not in (value is not in a list)
  Between: 'between',       // Between two values
  Like: 'like',             // Pattern matching (LIKE in SQL)
  NotLike: 'not_like',      // Pattern not matching (NOT LIKE in SQL)
  IsNull: 'is_null',        // Null check (IS NULL)
  IsNotNull: 'is_not_null' // Not null check (IS NOT NULL)
};
