class Subject:
    def __init__(self):
        self._observers = []
    
    def attach(self, observer):
        self._observers.append(observer)
    
    def notify(self, message):
        for observer in self._observers:
            observer.update(message)

class Observer:
    def __init__(self, name):
        self.name = name
        
    def update(self, message):
        print(f"{self.name} recibió: {message}")

if __name__ == "__main__":
    subject = Subject()
    obs1 = Observer("Observador 1")
    obs2 = Observer("Observador 2")
    
    subject.attach(obs1)
    subject.attach(obs2)
    
    subject.notify("¡Evento disparado!")
