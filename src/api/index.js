const domain = "http://localhost:5000";

class Api {
  constructor(domain) {
    this.domain = domain;
  }

  async perform(path, payload, config) {
    const request = await fetch(`${this.domain}/${path}`, {
      ...config,
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return await request.json();
  }

  async get(path) {
    return await this.perform(path);
  }

  async post(path, payload) {
    return await this.perform(path, payload, {
      method: "POST",
    });
  }

  async put(path, payload) {
    return await this.perform(path, payload, {
      method: "PUT",
    });
  }

  async delete(path) {
    return await this.perform(path, {
      method: "DELETE",
    });
  }
}

export default new Api(domain);
