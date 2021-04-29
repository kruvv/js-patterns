/**
 * Класс Фасада предоставляет простой интерфейс для сложной логики одной или
 * нескольких подсистем. Фасад делегирует запросы клиентов соответствующим
 * объектам внутри подсистемы. Фасад также отвечает за управление их жизненным
 * циклом. Все это защищает клиента от нежелательной сложности подсистемы.
 */
class Complaints {
  constructor() {
    this.complaints = [];
  }

  /**
   * Методы Фасада удобны для быстрого доступа к сложной функциональности
   * подсистем. Однако клиенты получают только часть возможностей подсистемы.
   */
  reply(complaint) {}

  add(complaint) {
    this.complaints.push(complaint);
    return this.reply(complaint);
  }
}

/**
 * Подсистема может принимать запросы либо от фасада, либо от клиента напрямую.
 * В любом случае, для Подсистемы Фасад – это еще один клиент, и он не является
 * частью Подсистемы.
 */
class ProductComplaints extends Complaints {
  reply({ id, customer, details }) {
    return `Product: ${id}: ${customer} (${details})`;
  }
}

class ServiceComplaints extends Complaints {
  reply({ id, customer, details }) {
    return `Service: ${id}: ${customer} (${details})`;
  }
}

/**
 * Некоторые фасады могут работать с разными подсистемами одновременно.
 * Класс определяет по типу какой объект необходимо вернуть клиенту.
 */
class ComplaintRegistry {
  register(customer, type, details) {
    const id = Date.now();
    let complaint;

    if (type === "service") {
      complaint = new ServiceComplaints();
    } else {
      complaint = new ProductComplaints();
    }

    return complaint.add({ id, customer, details });
  }
}

/**
 * Клиентский код работает со сложными подсистемами через простой интерфейс,
 * предоставляемый Фасадом. Когда фасад управляет жизненным циклом подсистемы,
 * клиент может даже не знать о существовании подсистемы. Такой подход позволяет
 * держать сложность под контролем.
 */
const registry = new ComplaintRegistry();

console.log(registry.register("Vladilen", "service", "недоступен"));
console.log(registry.register("Elena", "product", "вылазит ошибка"));
