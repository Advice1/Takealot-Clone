package org.acme;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class StoreUserDetails {
   private String Name;
    private String Surname;
    private String Email;
    private  String Password;
    private String ConfirmPassword;

}
