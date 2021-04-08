/**
 *  Паттерн Фабричный метод создает объекты не напрямую,
 *  используя оператор new, а через вызов особого фабричного метода.
 */

class SimpleMembership {
  constructor(name) {
    this.name = name
    this.cost = 50
  }
}

class StandardMembership {
  constructor(name) {
    this.name = name
    this.cost = 150
  }
}

class PremiumMembership {
  constructor(name) {
    this.name = name
    this.cost = 500
  }
}

class MemberFactory {
  static list = {
    simple: SimpleMembership,
    standard: StandardMembership,
    premium: PremiumMembership
  }

  create(name, type = 'simple') {
    const Membership = MemberFactory.list[type] || MemberFactory.list.simple
    const member = new Membership(name)
    // Устанавливаем тип
    member.type = type
    // Добавили новый функционал к объекту
    member.define = function() {
      console.log(`${this.name} (${this.type}): ${this.cost}`)
    }
    return member
  }
}

const factory = new MemberFactory()

const members = [
  factory.create('Vladilen', 'simple'),
  factory.create('Elena', 'premium'),
  factory.create('Vasilisa', 'standard'),
  factory.create('Ivan', 'premium'),
  factory.create('Petr')
]

members.forEach(m => {
  m.define()
})
