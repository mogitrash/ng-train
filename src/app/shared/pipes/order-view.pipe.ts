import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../../features/trips/models/order.model';
import { OrderForView } from '../../pages/orders-page/order/order.component';

@Pipe({
  name: 'transformOrder',
})
export class TransformOrderPipe implements PipeTransform {
  // хелперы для преобразования seatId в typeCarriage и numberCarriage
  private getTypeCarriage(seatId: number): string {
    // Пример вычислений, заменить на реальные
    return seatId < 20 ? 'carriage1' : 'carriage2';
  }

  private getNumberCarriage(seatId: number): number {
    // Пример вычислений, заменить на реальные
    // тут нужно получить о количестве мест в вагонах поезда с сервера используя ngrx
    return seatId < 20 ? 1 : 2;
  }

  private getNumberSeat(seatId: number): number {
    // Пример вычислений, заменить на реальные
    return seatId % 20;
  }

  transform(response: Order[]): OrderForView[] | [] {
    if (!response) {
      return [];
    }

    return response.map((order) => {
      const startStation = order.stationStart.toString(); // тут нужно получить название станции с сервера используя ngrx
      const endStation = order.stationEnd.toString(); // тут нужно получить название станции с сервера используя ngrx

      const startTime = formatDate(
        new Date(order.schedule.segments[0].time[0]),
        'MMMM dd hh:mm',
        'en-US',
      );
      const endTime = formatDate(
        new Date(order.schedule.segments[order.schedule.segments.length - 1].time[1]),
        'MMMM dd hh:mm',
        'en-US',
      );

      const startDate = new Date(order.schedule.segments[0].time[0]);
      const endDate = new Date(order.schedule.segments[order.schedule.segments.length - 1].time[1]);
      const durationTrip = this.calculateDuration(startDate, endDate);

      // сделать хелперы для рассчета
      const typeCarriage = this.getTypeCarriage(order.seatId);
      const numberCarriage = this.getNumberCarriage(order.seatId);
      const numberSeat = this.getNumberSeat(order.seatId);

      const price = this.calculateTotalPrice(order);

      return {
        id: order.id,
        userId: order.userId,
        startStation,
        startTime,
        endStation,
        endTime,
        durationTrip,
        typeCarriage,
        numberCarriage,
        numberSeat,
        price,
        status: order.status,
      };
    });
  }

  private calculateDuration(startDate: Date, endDate: Date): string {
    const durationMs = endDate.getTime() - startDate.getTime();
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }

  private calculateTotalPrice(response: Order): string {
    let totalPrice = 0;
    response.schedule.segments.forEach((segment, index) => {
      totalPrice += segment.price[response.carriages[index]];
    });
    return totalPrice.toFixed(2);
  }
}
