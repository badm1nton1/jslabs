// Лабораторная работа №4. Продвинутые объекты в JavaScript

// --- Классы (шаги 1–3) ---

/**
 * Предмет инвентаря.
 * @param {string} name - Название предмета.
 * @param {number} weight - Вес предмета (положительное число).
 * @param {string} rarity - Редкость: common, uncommon, rare, legendary.
 */
class Item {
  /** @type {string} */ name;
  /** @type {number} */ weight;
  /** @type {string} */ rarity;

  constructor(name, weight, rarity) {
    const validRarities = ["common", "uncommon", "rare", "legendary"];
    if (typeof weight !== "number" || weight <= 0) {
      console.log("Ошибка: вес должен быть положительным числом.");
      return;
    }
    if (!validRarities.includes(rarity)) {
      console.log("Ошибка: недопустимое значение редкости.");
      return;
    }
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
  }

  /**
   * Возвращает строку с информацией о предмете.
   * @returns {string} Информация о предмете.
   */
  getInfo() {
    return `Name: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
  }

  /**
   * Изменяет вес предмета.
   * @param {number} newWeight - Новый вес (положительное число).
   * @returns {void}
   */
  setWeight(newWeight) {
    if (typeof newWeight !== "number" || newWeight <= 0) {
      console.log("Ошибка: вес должен быть положительным числом.");
      return;
    }
    this.weight = newWeight;
  }
}

/**
 * Оружие, наследует Item.
 * @param {number} damage - Урон (положительное число).
 * @param {number} durability - Прочность (от 0 до 100).
 */
class Weapon extends Item {
  /** @type {number} */ damage;
  /** @type {number} */ durability;

  constructor(name, weight, rarity, damage, durability) {
    super(name, weight, rarity); // передаём поля родителю
    if (typeof damage !== "number" || damage <= 0) {
      console.log("Ошибка: урон должен быть положительным числом.");
      return;
    }
    if (typeof durability !== "number" || durability < 0 || durability > 100) {
      console.log("Ошибка: прочность должна быть числом от 0 до 100.");
      return;
    }
    this.damage = damage;
    this.durability = durability;
  }

  /**
   * Уменьшает прочность на 10 при использовании. Не уходит ниже 0.
   * @returns {void}
   */
  use() {
    if (this.durability > 0) {
      this.durability = Math.max(0, this.durability - 10);
    }
  }

  /**
   * Восстанавливает прочность до 100.
   * @returns {void}
   */
  repair() {
    this.durability = 100;
  }
}

// --- Тестирование классов ---

const sword = new Item("Steel Sword", 3.5, "rare");
console.log(sword.getInfo());
sword.setWeight(4.0);
console.log(sword.getInfo());

const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
console.log(bow.getInfo());
bow.use();
console.log(bow.durability); // 90
bow.repair();
console.log(bow.durability); // 100

const potion = new Item("Health Potion", 0.5, "common");
console.log(potion.getInfo());

const axe = new Weapon("Battle Axe", 5.0, "legendary", 40, 100);
console.log(axe.getInfo());
axe.use();
axe.use();
console.log(axe.durability); // 80

// --- Опциональная цепочка ---

// ?. не вызывает ошибку если объект null или undefined
const someItem = null;
console.log(someItem?.getInfo()); // undefined, без ошибки
console.log(sword?.getInfo());

// --- Функции-конструкторы (шаг 4 — переписанная версия классов) ---

/**
 * Функция-конструктор предмета инвентаря.
 * @param {string} name - Название предмета.
 * @param {number} weight - Вес предмета (положительное число).
 * @param {string} rarity - Редкость: common, uncommon, rare, legendary.
 */
function ItemConstructor(name, weight, rarity) {
  const validRarities = ["common", "uncommon", "rare", "legendary"];
  if (typeof weight !== "number" || weight <= 0) {
    console.log("Ошибка: вес должен быть положительным числом.");
    return;
  }
  if (!validRarities.includes(rarity)) {
    console.log("Ошибка: недопустимое значение редкости.");
    return;
  }
  this.name = name;
  this.weight = weight;
  this.rarity = rarity;
}

/**
 * Возвращает строку с информацией о предмете.
 * @returns {string} Информация о предмете.
 */
ItemConstructor.prototype.getInfo = function () {
  return `Name: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
};

/**
 * Изменяет вес предмета.
 * @param {number} newWeight - Новый вес (положительное число).
 * @returns {void}
 */
ItemConstructor.prototype.setWeight = function (newWeight) {
  if (typeof newWeight !== "number" || newWeight <= 0) {
    console.log("Ошибка: вес должен быть положительным числом.");
    return;
  }
  this.weight = newWeight;
};

/**
 * Функция-конструктор оружия, наследует ItemConstructor.
 * @param {string} name - Название оружия.
 * @param {number} weight - Вес (положительное число).
 * @param {string} rarity - Редкость.
 * @param {number} damage - Урон (положительное число).
 * @param {number} durability - Прочность (от 0 до 100).
 */
function WeaponConstructor(name, weight, rarity, damage, durability) {
  ItemConstructor.call(this, name, weight, rarity); // наследуем поля
  if (typeof damage !== "number" || damage <= 0) {
    console.log("Ошибка: урон должен быть положительным числом.");
    return;
  }
  if (typeof durability !== "number" || durability < 0 || durability > 100) {
    console.log("Ошибка: прочность должна быть числом от 0 до 100.");
    return;
  }
  this.damage = damage;
  this.durability = durability;
}

// настраиваем наследование прототипа
WeaponConstructor.prototype = Object.create(ItemConstructor.prototype);
WeaponConstructor.prototype.constructor = WeaponConstructor;

/**
 * Уменьшает прочность на 10 при использовании. Не уходит ниже 0.
 * @returns {void}
 */
WeaponConstructor.prototype.use = function () {
  if (this.durability > 0) {
    this.durability = Math.max(0, this.durability - 10);
  }
};

/**
 * Восстанавливает прочность до 100.
 * @returns {void}
 */
WeaponConstructor.prototype.repair = function () {
  this.durability = 100;
};

// --- Тестирование функций-конструкторов ---

const shield = new ItemConstructor("Wooden Shield", 3.0, "common");
console.log(shield.getInfo());
shield.setWeight(3.5);
console.log(shield.getInfo());

const dagger = new WeaponConstructor("Dagger", 1.0, "uncommon", 10, 100);
console.log(dagger.getInfo());
dagger.use();
console.log(dagger.durability); // 90
dagger.repair();
console.log(dagger.durability); // 100