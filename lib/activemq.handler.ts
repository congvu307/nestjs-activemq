import { Injectable, Inject } from "@nestjs/common";
import stompit = require("stompit");
import { ConnectOptions } from "stompit/lib/connect";
import { Options } from "./options.interface";
@Injectable()
export class ActiveMQHandler {
  private client: stompit.Client = null;
  private options: Options;
  constructor(@Inject("ACTIVEMQ_CONFIG") options: Options) {
    this.options = options;
  }

  public async init() {
    const servers: ConnectOptions[] = [
      {
        host: this.options.host,
        port: this.options.port,
        connectHeaders: {
          host: this.options.host,
          login: this.options.username,
          passcode: this.options.password,
        },
      },
    ];

    const reconnectOptions = {
      maxReconnects: this.options.maxConnection,
    };

    const connections = new stompit.ConnectFailover(servers, reconnectOptions);

    var p = new Promise((resolve) => {
      connections.connect((error, _client, reconnect) => {
        if (error) {
          console.log("connect error " + error.message);
          return;
        }

        console.log("MessageBroker connected!");

        this.client = _client;

        this.client.on("error", (error) => {
          console.log("reconnecting ....");
          reconnect();
        });

        resolve(null);
      });
    });

    return p;
  }

  public sendMessage(messageToPublish, queue: string) {
    const sendHeaders = {
      destination: queue,
      //'content-type': 'application/json'
      transformation: "jms-object-json",
    };

    const frame = this.client.send(sendHeaders);
    frame.write(messageToPublish);
    frame.end();
  }

  public subscribe(queue, callback) {
    const subscribeHeaders = {
      destination: queue,
      ack: "client-individual",
    };

    this.client.subscribe(subscribeHeaders, (error, message) => {
      if (error) {
        callback(error)
        return
      }

      message.readString("utf-8", (error, body) => {
        if (error) {
          callback(error)
          return;
        }

        console.log("received message: " + body);

        if (body != undefined) {
          try {
            const extractedData = JSON.parse(body)
            callback(null, extractedData);
          } catch (error) {
            callback(error)
          }
        }

        this.client.ack(message);
      });
    });
  }

  public cleanup() {
    if (this.client) {
      this.client.disconnect();
    }
  }
}
