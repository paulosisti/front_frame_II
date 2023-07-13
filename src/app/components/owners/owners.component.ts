import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Owner } from './owners';
import { OwnerService } from './owners.service';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css']
})
export class OwnersComponent implements OnInit {

  owners: Owner[] = [];
  selectedOwner: Owner | null = null;

  constructor(private ownerService: OwnerService, private router: Router) { }

  ngOnInit(): void {
    this.ownerService.findAll().subscribe(
      (owners: Owner[]) => {
        this.owners = owners;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  selectOwner(owner: Owner) {
    this.selectedOwner = owner;

    if (this.selectedOwner) {
      const ownerId = this.selectedOwner._id!;
      this.router.navigate(['/listarPokemons', ownerId]);
    }
  }
}
