describe("Buscar Dispositivos", () => {
  it("Listar todos dispositivos", () => {
    cy.api({
      method: "GET",
      url: "https://api.restful-api.dev/objects",
      failOnStatusCode: false,
    }).then((r) => {
      expect(r.duration).to.be.lessThan(1500); //verificar se a requisição foi feita em menos de 1 segundo
      expect(r.status).equal(200); //status da requisição
      expect(r.body).to.be.an("array"); // verificar se é um array
      expect(r.body).to.have.length(13); // verificar se tem 13 elementos

      const ids = r.body.map((dispositivo) => dispositivo.id);
      expect(ids).to.have.lengthOf(new Set(ids).size); // verificar se não tem ids duplicados

      r.body.forEach((dispositivo) => {
        //verificar se cada dispositivo tem os atributos esperados
        expect(dispositivo).to.have.property("id").and.to.be.a("string");
        expect(dispositivo).to.have.property("name").and.to.be.a("string");
        expect(dispositivo).to.have.property("data");
      });

      r.body.forEach((dispositivo) => {
        //verificar se o atributo data é nulo ou um objeto
        expect(dispositivo.data).to.satisfy(
          (value) => value === null || typeof value === "object"
        );
      });

      r.body.forEach((dispositivo) => {
        //verificar se o atributo data.price é um número maior que zero
        if (dispositivo.data && dispositivo.data.price) {
          expect(dispositivo.data.price)
            .to.be.a("number")
            .and.to.be.greaterThan(0);
        }
      });
    });
  });

  it("Buscar dispositivo especifico", () => {
    cy.api({
      method: "GET",
      url: "https://api.restful-api.dev/objects/7",
    }).then((r) => {
      cy.log("Resposta: ", r.body);
      cy.log("Codigo", r.status);

      expect(r.status).equal(200);
      expect(r.body.id).equal("7");
      expect(r.body.id).not.empty;
      expect(r.body.name).equal("Apple MacBook Pro 16");
    });
  });

  it("Buscar dispositivo inexistente", () => {
    const id = "12345678";
    cy.api({
      method: "GET",
      url: `https://api.restful-api.dev/objects/${id}`,
      failOnStatusCode: false,
    }).then((r) => {
      expect(r.status).equal(404);
      expect(r.body.error).equal("Oject with id=12345678 was not found.");
    });
  });
  it("Cadastrar dispositivo, consultar dispositivo, alterar dispositivo e deletar dispositivo", () => {
    cy.api({
      method: "POST",
      url: `https://api.restful-api.dev/objects`,
      body: {
        name: "Lenovo ThinkPad",
        data: {
          year: 2024,
          price: 2999.99,
          "CPU model": "Intel Core i9",
          "Hard disk size": "1 TB",
        },
      },
    }).then((r) => {
      const id = r.body.id;

      expect(r.status).equal(200);
      expect(id).to.exist;

      cy.api({
        method: "GET",
        url: `https://api.restful-api.dev/objects/${id}`,
      }).then((r) => {
        expect(r.status).equal(200);
        expect(r.body.id).equal(id);
        expect(r.body.name).equal("Lenovo ThinkPad");
        expect(r.body.data.year).equal(2024);
        expect(r.body.data.price).equal(2999.99);
      });

      cy.api({
        method: "PUT",
        url: `https://api.restful-api.dev/objects/${id}`,
        body: {
          name: "Acer nitro 5",
        },
      }).then((r) => {
        expect(r.status).equal(200);
        expect(r.body.name).equal("Acer nitro 5");
      });

      cy.api({
        method: "DELETE",
        url: `https://api.restful-api.dev/objects/${id}`,
      }).then((r) => {
        expect(r.status).equal(200);
      });

      cy.api({
        method: "GET",
        url: `https://api.restful-api.dev/objects/${id}`,
        failOnStatusCode: false,
      }).then((r) => {
        expect(r.status).equal(404);
        expect(r.body.error).equal(`Oject with id=${id} was not found.`);
      });
    });
  });
});
